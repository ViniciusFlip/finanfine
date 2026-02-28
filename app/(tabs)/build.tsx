import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, TextInput } from 'react-native';
import Constants from "expo-constants" 
import { Lancamento } from '../../src/types/Lancamento';
import {LancamentoParser} from '@/services/lancamentoParser'

 
export default function App() {

  const [theme, setTheme] = useState<"light" | "dark">('light') 
  const [contador, setContador] = useState(0);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [descricao, setDescricao] = useState('')


  // Versão do app
  const versionApp=Constants.expoConfig?.version

 
  async function addPorTexto(texto:string){
    const dados=LancamentoParser(texto)
    const novoLancamento: Lancamento = {
      tipo: dados.tipo,
      valor: dados.valor,
      descricao: dados.descricao,
      data: new Date().toLocaleDateString(),
    }; 
    setLancamentos([...lancamentos, novoLancamento])
 
  }
  // FN pra salvar o thema 
  async function SaveTheme(value:"light" | "dark" ){
    setTheme(value)
    await AsyncStorage.setItem('theme', value)
  }

  async function LoadTheme(){
    const storageTheme=await AsyncStorage.getItem('theme')
     
    if(storageTheme==="light" || storageTheme==="dark"){
      setTheme(storageTheme)
    }
  }

  function renderLancamento({ item }: { item: Lancamento }) {
    return (
      <View
        style={{
          padding: 10,
          marginVertical: 4,
          backgroundColor: item.tipo === 'entrada' ? '#d4f7d4' : '#f7d4d4',
          borderRadius: 6,
        }}
      >
        <Text>
          {item.tipo.toUpperCase()} — R$ {item.valor}
        </Text>
        <Text>{item.descricao}</Text>
        <Text>{item.data}</Text>
      </View>
    );
  }

  /* add LANÇAMENTO */
  async function addValor(lancamento: Lancamento) {
    const novaLista = [...lancamentos, lancamento];
    setLancamentos(novaLista);

    await AsyncStorage.setItem(
      'lancamentos',
      JSON.stringify(novaLista)
    );
  }

  /*  CONTADOR (LEGADO / build) */
  async function Save() {
    const newValue = contador + 1;
    setContador(newValue);
    await AsyncStorage.setItem('contador', newValue.toString());
  }

  async function Load() {
     
     try{

        const storageLancamentos=await AsyncStorage.getItem('lancamentos') 
        if(storageLancamentos){
            const lista: Lancamento[] = JSON.parse(storageLancamentos);
            setLancamentos(lista)
        }

     }catch(err){
        console.log(err)
     }
  }

  async function Clear() {
    await AsyncStorage.removeItem('lancamentos');
    setLancamentos([]);
  }

  /* CARREGAR AO INICIAR  */
  useEffect(() => {
    Load();
    LoadTheme();
  }, []);

  const isDark=theme==="dark"
  const styles={
    Container:{
      backgroundColor: isDark ? 'black':'white',
      flex: 1, 
      padding: 20
    }
    
  }
  return (
    <View style={styles.Container}>

      <Text>Tema:{theme==='dark' ? 'Dark':'Ligth'}</Text>
      <Button title="Modo Claro ☀️" onPress={() =>SaveTheme('light')} />
      <Button title="Modo Escuro 🌙" onPress={() => SaveTheme('dark')} />
      <Text>Valor salvo offline: {contador}</Text>

      <Button title="Salvar Offline" onPress={Save} />
      <Button title="Limpar Contador" onPress={Clear} />

      <TextInput
         placeholder="Descrição (ex: Freela, Mercado)"
         value={descricao}
         onChangeText={setDescricao}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            width: '80%',
            marginBottom: 10,
            borderRadius: 6,
          }}
      ></TextInput>
     <Button
      title="Entrada +10"
      onPress={() => {
        addValor({
          valor: 10,
          tipo: 'entrada',
          descricao: descricao,
          data: new Date().toLocaleDateString(),
        });
        setDescricao('');
      }}
/>

      <FlatList
        data={lancamentos}
        renderItem={renderLancamento}
        keyExtractor={(_, index) => index.toString()}
        style={{ width: '100%',  marginTop:20 }}
      />

    
      <Text>Versão: {versionApp}</Text>
    </View>
  );
}