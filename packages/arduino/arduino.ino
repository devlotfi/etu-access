#include <rdm6300.h>

#define RDM6300_RX_PIN 4
#define LED_PIN 3
#define BUZZER_PIN 2

Rdm6300 rdm6300;

void setup()
{
	Serial.begin(9600);

  pinMode(BUZZER_PIN, OUTPUT);
	digitalWrite(BUZZER_PIN, LOW);

	pinMode(LED_PIN, OUTPUT);
	digitalWrite(LED_PIN, LOW);

	rdm6300.begin(RDM6300_RX_PIN);
}

void loop()
{
	if (rdm6300.get_new_tag_id()) {
    Serial.println(rdm6300.get_tag_id(), HEX);
  }

	digitalWrite(LED_PIN, rdm6300.get_tag_id());
  digitalWrite(BUZZER_PIN, rdm6300.get_tag_id());

	delay(10);
}