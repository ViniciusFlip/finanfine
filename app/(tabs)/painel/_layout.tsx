import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import {View, Image, Text} from 'react-native'

function CustomDrawerMenu(props:any){
    return(
        <DrawerContentScrollView {...props}> 
           
        <View> 
            <Text>Finanfine</Text>
        </View>
        <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

function HeaderBrand() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8, // cola mais na esquerda
      }}
    >
      <Image
        source={require("../../../assets/finanfine.png")}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
      <Text
        style={{
          marginLeft: 8,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        FinanFine
      </Text>
    </View>
  );
}
export default function PainelLayout(){
    return(
        <Drawer
            drawerContent={(props)=><CustomDrawerMenu {...props} />}
             screenOptions={{
                    headerLeft:()=><HeaderBrand />,
                    headerTitle: "", 
                    drawerPosition:'right',
                    headerShown:true,
                }} 
            >
            <Drawer.Screen
                name='index'
                screen-options={{
                    title:'Configurações'
                }}
               
            />
        </Drawer >
    )
}

