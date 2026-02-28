// Recebe Texto valida, devolve tipo, valor, descricao ou retorna erro
import {useState} from 'react'
import {View, TextInput, Button} from 'react-native'

interface Props{
  onAdd: (texto:string) => void
}

export function AddLancamentosInput({onAdd}:Props){

   const [descricao, setDescricao] = useState('')

   function HandleAdd() {
    console.log('Handle',descricao)
      if (!descricao.trim()) return;

      onAdd(descricao);
      setDescricao('');
    }
    return(
      <View>
        <TextInput
          placeholder='Ex: Entrada 20 freela'
          value={descricao}
          onChangeText={setDescricao}
          style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 8,
          borderRadius: 6,
        }}
        ></TextInput>
        <Button 
            title='Adicionar'
            onPress={HandleAdd}
        
        />
      </View>
    )
  }