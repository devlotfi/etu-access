import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationTab from '../components/navigation-tab';
import TabsNavigationLayout from './tabs-navigation-layout';

export default function AccessControlsLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <TabsNavigationLayout>
      <NavigationTab
        title="Access controls list"
        icon={faList}
        active={pathname === '/dashboard'}
        onPress={() => navigate('/dashboard')}
      ></NavigationTab>
      <NavigationTab
        title="Add access control"
        icon={faPlus}
        active={pathname === '/dashboard/access-controls/add'}
        onPress={() => navigate('/dashboard/access-controls/add')}
      ></NavigationTab>
    </TabsNavigationLayout>
  );
}
