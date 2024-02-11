import { NavigationContainer } from '@react-navigation/native';
import InventoryView from './Inventory/Components/InventoryView';
import Main from './App/Main';


export default function App() {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>
  );
}

