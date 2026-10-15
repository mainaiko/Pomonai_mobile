import {Text,TextInput,Button,Alert,View,Image,StyleSheet} from "react-native";
import React, {useState} from "react";
export default function Index(){
   const [duvida,setDuvida] = useState('');
   const enviarDuvida = async() =>{
      try{
         const response = await fetch('http://localhost:8080/duvida',{
            method:'POST',
            headers:{
               'Content-Type':'application/json',
            },
            body:JSON.stringify({duvida}),
         });
         Alert.alert("Dúvida enviada com sucesso!");

      }catch(error){
         Alert.alert("Erro ao enviar dúvida");
      }
   }
    return(
       <View style={styles.container}>
       
           <Text style={styles.text}>Pomonai APP</Text>
           <TextInput
             style={styles.input}
             placeholder="Digite sua dúvida..."
             value={duvida}
             onChangeText={setDuvida}
           />
           <Button 
              style={styles.button}
              title="Enviar"
              onPress={enviarDuvida}
           />
       </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0d4c",
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    maxWidth: 420,
    minHeight: 56,
    backgroundColor: "#141a6b",
    color: "#ffffff",
    fontSize: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#4da3ff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#2196f3",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});