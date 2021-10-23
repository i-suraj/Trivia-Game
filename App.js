import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [question, setquestion] = useState('');
  const [answer, setanswer] = useState('');
  const [response, setresponse] = useState('');

  useEffect(() => {
    quizQuestions();
  }, []);

  const quizQuestions = () => {
    try {
      setanswer({})
      setresponse('')
      var url = 'https://jservice.io/api/random';
      fetch(url).then(response => response.json())
        .then(jsonResponse => {
          setquestion({ "qus": jsonResponse[0].question, "ans": jsonResponse[0].answer })
        },
          (error) => {
            console.log("Something went wrong! please try again.");
          });
    } catch (e) {
      console.error(e);
    }
  }

  const checkAnswer = () => {
    if (answer.data == undefined || answer.data == '') {
      alert("write your answer!");
      setresponse('')
    } else if (answer.data && answer.data.toLowerCase() == question.ans && question.ans.toLowerCase()) {
      setresponse("CORRECT")
    } else {
      setresponse("INCORRECT")
    }
  }

  const handleResponse = () => {
    console.log(response)
    let view = "";
    switch (response) {
      case "CORRECT": return <Text style={styles.successresponse}>Correct Answer &#10003;</Text>;
      case "INCORRECT": return (<View>
        <Text style={styles.failresponse}>Incorrect Answer &#10060;</Text>
        <Text style={styles.successresponse}>Correct Answer is: {question.ans}</Text>
      </View>);
      default: return null;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO TRIVIA GAME</Text>
      <View style={styles.question}>
        <Text style={{ fontWeight: 'bold' }}>Question: </Text>
        <Text>{question.qus}</Text>
      </View>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Write your answer here!"
        onChangeText={(e) => setanswer({ "data": e })}
        value={answer.data}
      />
      <View style={{ alignItems: "center" }}>
        {handleResponse()}
        <Text>Click on next to move to next question.</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.submit} onPress={checkAnswer}>
          <Text style={styles.btnText}>SUBMIT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.next} onPress={quizQuestions}>
          <Text style={styles.btnText}>NEXT -></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  title: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    textDecorationLine: "underline",
  },
  question: {
    margin: 18,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    margin: 10,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    padding: 10,
    overflow: 'scroll',
  },
  successresponse: {
    height: 30,
    color: 'green',
    fontWeight: 'bold',
  },
  failresponse: {
    height: 30,
    color: 'red',
    fontWeight: 'bold',
  },
  submit: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 5,
    backgroundColor: "#5AC40B",
  },
  btnText: {
    color: '#fff',
  },
  next: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#0E43C8",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
