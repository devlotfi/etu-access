use std::{io, sync::{atomic::{AtomicBool, Ordering}, Arc, Mutex}, thread, time::Duration};

use lazy_static::lazy_static;
use serde::Serialize;
use serialport::SerialPort;
use tauri::{AppHandle, Emitter};

#[derive(Serialize)]
struct TauriError {
  message: String
}

#[derive(Serialize)]
struct SerializableSerialPortInfo {
  port_name: String
}

lazy_static! {
  static ref SERIAL_PORT: Arc<Mutex<Option<Box<dyn SerialPort>>>> = Arc::new(Mutex::new(None));
  static ref LISTENING_THREAD: Arc<Mutex<Option<thread::JoinHandle<()>>>> = Arc::new(Mutex::new(None));
  static ref STOP_SIGNAL: Arc<AtomicBool> = Arc::new(AtomicBool::new(false));
}

#[tauri::command]
fn serial_port_list() -> Result<Vec<SerializableSerialPortInfo>, TauriError> {
  let ports = match serialport::available_ports() {
    Ok(ports) => ports,
    Err(_) => return Err(TauriError { message: "Error gettings ports".to_string() })
  };
  
  let port_list: Vec<SerializableSerialPortInfo> = ports.into_iter().map(|port| SerializableSerialPortInfo {
    port_name: port.port_name
  }).collect();

  Ok(port_list)
}

#[tauri::command]
fn connect_to_serial_port(app_handle: AppHandle, port_name: String) -> Result<(), TauriError> {
  let port = match serialport::new(port_name, 9600)
    .timeout(Duration::from_millis(10))
    .open() {
      Ok(port) => port,
      Err(_) => return Err(TauriError { message: "Error connection to port".to_string() })
  };

  let port_clone = match port.try_clone() {
    Ok(port) => port,
    Err(_) => return Err(TauriError { message: "Error cloning port".to_string() })
  };

  // Lock and store the serial port in the global variable
  *SERIAL_PORT.lock().unwrap() = Some(port_clone);
  STOP_SIGNAL.store(false, Ordering::SeqCst);

  // Spawn a thread for listening
  let handle = thread::spawn(move || {
    let mut buffer = vec![0; 1024];  // Buffer for incoming data
    let mut message = Vec::new();  // To accumulate the message

    while !STOP_SIGNAL.load(Ordering::SeqCst) {
        // Lock the serial port to read data
        if let Some(ref mut port) = *SERIAL_PORT.lock().unwrap() {
            match port.read(&mut buffer) {
                Ok(bytes_read) if bytes_read > 0 => {
                    // Add the received data to the message buffer
                    message.extend_from_slice(&buffer[..bytes_read]);

                    // Check if we received a complete message (e.g., newline)
                    if let Some(pos) = message.iter().position(|&byte| byte == b'\n') {
                        // Extract and print the message up to the newline
                        let complete_msg = String::from_utf8_lossy(&message[..pos]);
                        println!("Received: {}", complete_msg);
                        let _ = app_handle.emit("CARD_DETECTED", complete_msg);

                        // Remove the processed part of the message
                        message.drain(..=pos);
                    }
                }
                Err(e) if e.kind() == io::ErrorKind::TimedOut => continue,
                Err(_) => break,
                _ => continue,
            }
        } else {
            break;
        }
    }
  });

  // Store the thread handle
  *LISTENING_THREAD.lock().unwrap() = Some(handle);
  Ok(())
}

#[tauri::command]
fn close_serial_connection() -> Result<(), TauriError> {
  // Drop the serial port to close the connection
  STOP_SIGNAL.store(true, Ordering::SeqCst);
  *SERIAL_PORT.lock().unwrap() = None;
  // Stop the listening thread if it's running
  if let Some(handle) = LISTENING_THREAD.lock().unwrap().take() {
    match handle.join() {
      Ok(_) => (),
      Err(_) => return Err(TauriError { message: "Failed to close thread".to_string() })
    };
  }

  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .invoke_handler(tauri::generate_handler![
      serial_port_list,
      connect_to_serial_port,
      close_serial_connection
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
