import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';

// Desenvolvedor: Renan Maciel ( TADS )

async function executeGet(url, jsonState) {
  //get síncrono com o uso do fetch
  await fetch(url)
    .then((response) => {
      if (response.status === 200) {
        console.log('sucesso');
        response.json().then(function (result) {
          //console.log(result);
          jsonState(result);
        });
      } else {
        throw new Error('Erro ao consumir a API!');
      }
    })
    .then((response) => {
      //console.debug(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

const ShowDetalhes = ({ display, toogleModal, mensagem }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={display}
    onRequestClose={toogleModal}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable onPress={toogleModal}>
          <Text>{mensagem}</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const Pessoa = ({ nome, year }) => {
  //state para controle do Modal
  const [modal, setModal] = React.useState(false);

  function mudaModal() {
    setModal(!modal);
  }

  return (
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={year} />

      <Pressable onPress={mudaModal}>
       
        

        <Text style={styles.paragraph}>{nome}</Text>
      </Pressable>
    </View>
  );
};

//item com uma arrow function
/*const meuItemObj = ({item}) => (
  <View>
      <Text style={styles.paragraph}>{item.title}</Text>
    </View>
)*/

export default function App() {
  const [jsonData, setJsonData] = React.useState({});

  executeGet(
    'https://reqres.in/api/unknown',
    setJsonData
  );

  //função que renderiza cada item do FlatList
  function meuItem({ item }) {
    

    return <Pessoa 
                  nome={item.name} 
                  year={item.year} />;
  }

  const listH = () => {
    return (
        <Text style={styles.header}> ADO 02  - Renan Maciel</Text>
    )
  }

  return (
    <View style={styles.container}>
    
      <FlatList
        data={jsonData.data}
        renderItem={meuItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listH}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'pink',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'none',

  }
});