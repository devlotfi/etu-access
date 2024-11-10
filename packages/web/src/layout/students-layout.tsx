import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationTab from '../components/navigation-tab';
import TabsNavigationLayout from './tabs-navigation-layout';

export default function StudentsLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <TabsNavigationLayout>
      <NavigationTab
        title="Students list"
        icon={faList}
        active={pathname === '/dashboard/students'}
        onPress={() => navigate('/dashboard/students')}
      ></NavigationTab>
      <NavigationTab
        title="Add student"
        icon={faPlus}
        active={pathname === '/dashboard/students/add'}
        onPress={() => navigate('/dashboard/students/add')}
      ></NavigationTab>
    </TabsNavigationLayout>
  );
}
