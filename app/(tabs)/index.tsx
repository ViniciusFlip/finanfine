import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

/* 1️⃣ MODELO — sempre no topo */
interface Lancamento {
  valor: number;
  tipo: 'entrada' | 'saida';
  data: string;
}

export default function App() {

  /* 2️⃣ ESTADOS */
  const [contador, setContador] = useState(0);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

  /* 3️⃣ RENDERIZAÇÃO DO ITEM */
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
        <Text>{item.data}</Text>
      </View>
    );
  }

  /* 4️⃣ ADICIONAR LANÇAMENTO */
  async function addValor(lancamento: Lancamento) {
    const novaLista = [...lancamentos, lancamento];
    setLancamentos(novaLista);

    await AsyncStorage.setItem(
      'lancamentos',
      JSON.stringify(novaLista)
    );
  }

  /* 5️⃣ CONTADOR (LEGADO / TESTE) */
  async function Save() {
    const newValue = contador + 1;
    setContador(newValue);
    await AsyncStorage.setItem('contador', newValue.toString());
  }

  async function Load() {
    const value = await AsyncStorage.getItem('contador');
    if (value !== null) {
      setContador(parseInt(value));
    }
  }

  async function Clear() {
    await AsyncStorage.removeItem('contador');
    setContador(0);
  }

  /* 6️⃣ CARREGAR AO INICIAR (IMPORTANTE) */
  useEffect(() => {
    Load();
  }, []); // ← evita loop infinito

  /* 7️⃣ UI */
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Valor salvo offline: {contador}</Text>

      <Button title="Salvar Offline" onPress={Save} />
      <Button title="Limpar Contador" onPress={Clear} />

      <Button
        title="Entrada +10"
        onPress={() =>
          addValor({
            valor: 10,
            tipo: 'entrada',
            data: new Date().toLocaleDateString(),
          })
        }
      />

      <FlatList
        data={lancamentos}
        renderItem={renderLancamento}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}