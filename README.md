<img height="100px" width="100px" src="https://github.com/devlotfi/etu-access/blob/main/github-assets/logo.svg">

# 📜 etu-access

An automatic student attendance system using student id cards (These card are 125khz RFID tags)

# 📌 Contents

- [Tech stack](#-tech-stack)
- [Project setup](#-project-setup)
- [Preview](#-preview)

# 💻 Tech stack

## Frontend

<p float="left">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/html.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/css.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/ts.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/tailwind.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/react.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/fontawesome.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/formik.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/nextui.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/reactquery.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/vite.svg">
</p>

## Desktop app
The same app implemented twice using

<p float="left">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/tauri.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/rust.svg">
</p>
<p float="left">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/electron.svg">
</p>

## Backend

<p float="left">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/nodejs.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/nestjs.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/prisma.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/postgres.svg">
</p>

## Other

<p float="left">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/jwt.svg">
  <img height="50px" src="https://github.com/devlotfi/stack-icons/blob/main/icons/arduino.svg">
</p>

# 📂 Project Setup

## Arduino setup

<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/arduino-setup.png">

# Parts

- Breadboard (Optional)
- Jumper wires
- Arduino Nano
- Rdm6300 (Antenna is included)
- Buzzer
- Green LED
- 220Ω Resistor

## Software requirements

- Node JS
- pnpm
- Rust
- Arduino IDE

## Install

### Arduino

**Upload the arduino program provideed in th repo**

### NPM deps

```bash
$ pnpm i
```

## Development

### Web app

```bash
$ pnpm run dev
```

### Tauri desktop app

```bash
$ pnpm tauri dev
```

### Server

```bash
$ pnpm prisma generate
$ pnpm run start:dev
```

# 📷 Preview

## Access point desktop app

This app is used to read student id card by communicating with the arduino and allows exporting them to the server

<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/access-point/preview-1.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/access-point/preview-2.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/access-point/preview-3.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/access-point/preview-4.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/access-point/preview-5.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/access-point/preview-6.png">

## Admin panel

This app is used for general management its features depend on the admin ststus of the connected user, it allows managing users, students, access-points, and exported attendance lists

<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/admin-panel/preview-1.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/admin-panel/preview-2.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/admin-panel/preview-3.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/admin-panel/preview-4.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/admin-panel/preview-5.png">
<img src="https://github.com/devlotfi/etu-access/blob/main/github-assets/admin-panel/preview-6.png">
