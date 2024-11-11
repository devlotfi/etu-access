import {
  faComputer,
  faGear,
  faLanguage,
  faMoon,
  faPaintBrush,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody, Divider, Select, SelectItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Heading, ThemeContext, ThemeOptions } from '@etu-access/lib';

export function SettingsPage() {
  const { setTheme, themeOption } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

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
              label={t('theme')}
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
                {t('light')}
              </SelectItem>
              <SelectItem
                startContent={<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>}
                key={ThemeOptions.DARK}
              >
                {t('dark')}
              </SelectItem>
              <SelectItem
                startContent={
                  <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>
                }
                key={ThemeOptions.SYSTEM}
              >
                {t('system')}
              </SelectItem>
            </Select>
            <Divider></Divider>
            <Select
              variant="bordered"
              label={t('language')}
              defaultSelectedKeys={[i18n.language]}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              startContent={
                <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>
              }
            >
              <SelectItem
                startContent={
                  <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>
                }
                key={'en'}
              >
                English
              </SelectItem>
              <SelectItem
                startContent={
                  <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>
                }
                key={'fr'}
              >
                Français
              </SelectItem>
              <SelectItem
                startContent={
                  <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>
                }
                key={'ar'}
              >
                العربية
              </SelectItem>
            </Select>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
