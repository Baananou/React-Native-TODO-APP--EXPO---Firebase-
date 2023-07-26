import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
export interface Todo {
    title: string;
    done: boolean;
    id: string;
}
const List = ({ navigation }: any) => {
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [todo, setTodo] = React.useState("");

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, "todos");
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {

                const todos: Todo[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    } as Todo);
                });
                setTodos(todos);
            },
        });
        return () => subscriber()
    }, []);
    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
            title: todo,
            done: false,
        });
        setTodo("");
        // console.log(`Document added with ID ${doc.id}`, doc)
    };
    const renderTodo = ({ item }: any) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`)
        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done })
        }
        const deleteItem = async () => {
            deleteDoc(ref)
        }
        return (

            <View style={styles.todoContainer} >
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done && <Entypo name="check" size={24} color="green" />}
                    {!item.done && <Entypo name="circle" size={24} color="grey" />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Entypo name="trash" size={24} color="red" onPress={deleteItem} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Add New Todo"
                    onChangeText={(text: string) => setTodo(text)}
                    value={todo}
                />
                <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
            </View>
            {
                todos.length > 0 && (
                    <View>
                        <FlatList
                            data={todos} renderItem={renderTodo} keyExtractor={(todo: Todo) => todo.id} />
                    </View>
                )
            }
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    input: {
        flexGrow: 1,
        height: 35,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    todoContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#0001',
        marginVertical: 4,
        padding: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',

    },
    todoText: {
        flexGrow: 1,
        paddingHorizontal: 10,
        fontSize: 22
    },
    todo: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
    }
});
