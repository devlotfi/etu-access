import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationTab from '../components/navigation-tab';
import TabsNavigationLayout from './tabs-navigation-layout';

export default function UsersLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <TabsNavigationLayout>
      <NavigationTab
        title="User list"
        icon={faList}
        active={pathname === '/dashboard/users'}
        onPress={() => navigate('/dashboard/users')}
      ></NavigationTab>
      <NavigationTab
        title="Add user"
        icon={faPlus}
        active={pathname === '/dashboard/users/add'}
        onPress={() => navigate('/dashboard/users/add')}
      ></NavigationTab>
    </TabsNavigationLayout>
  );
}
