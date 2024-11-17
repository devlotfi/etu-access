import {
  faComputer,
  faGear,
  faMoon,
  faPaintBrush,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody, Select, SelectItem } from '@nextui-org/react';
import { useContext } from 'react';
import { Heading, ThemeContext, ThemeOptions } from '@etu-access/lib';

export function SettingsPage() {
  const { setTheme, themeOption } = useContext(ThemeContext);

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-col w-full max-w-screen-md px-[0.5rem]">
        <Heading
          icon={faGear}
          text="Settings"
          classNames={{ wrapper: 'py-[2rem]' }}
        ></Heading>

        <Card shadow="none" className="border-divider border" fullWidth>
          <CardBody className="space-y-3">
            <Select
              variant="bordered"
              label="Theme"
              defaultSelectedKeys={[themeOption]}
              onChange={(event) => setTheme(event.target.value as ThemeOptions)}
              startContent={
                <FontAwesomeIcon icon={faPaintBrush}></FontAwesomeIcon>
              }
            >
              <SelectItem
                startContent={<FontAwesomeIcon icon={faSun}></FontAwesomeIcon>}
                key={ThemeOptions.LIGHT}
              >
                Light
              </SelectItem>
              <SelectItem
                startContent={<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>}
                key={ThemeOptions.DARK}
              >
                Dark
              </SelectItem>
              <SelectItem
                startContent={
                  <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>
                }
                key={ThemeOptions.SYSTEM}
              >
                System
              </SelectItem>
            </Select>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
