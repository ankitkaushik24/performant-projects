"use client";

import { FC } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { batch, signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useSignal, useComputed } from "@preact/signals-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const TodoItem = ({ todo, removeTodo }) => {
  useSignals();

  console.log("TodoItem rendered!", todo.text);

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <Label className="flex items-center">
        <Checkbox
          checked={todo.completed.value}
          onCheckedChange={() => (todo.completed.value = !todo.completed.value)}
          className="mr-2"
        />
        <span className={todo.completed.value ? "line-through" : ""}>
          {todo.text}
        </span>
      </Label>
      <Trash2 className="cursor-pointer" onClick={removeTodo} />
    </div>
  );
};

const TodoList = ({ todos, removeTodo }) => {
  useSignals();

  console.log("TodoList rendered!");

  return (
    <>
      {todos.value.map((todo, index) => (
        <TodoItem key={index} removeTodo={() => removeTodo(todo)} todo={todo} />
      ))}
    </>
  );
};

const AddTodoButton = ({ addTodo }) => {
  const newTodo = useSignal("");

  const addNewTodo = () => {
    batch(() => {
      addTodo(newTodo.value);
      newTodo.value = "";
    });
  };

  const inputBox = useComputed(() => {
    return (
      <Input
        type="text"
        placeholder="Add a new todo"
        value={newTodo.value}
        onKeyUp={(e) => e.key === "Enter" && addNewTodo()}
        onChange={(e) => (newTodo.value = e.target.value)}
        className="flex-grow mr-2"
      />
    );
  });

  console.log("AddTodoButton rendered!");

  return (
    <div className="flex mb-4">
      {inputBox}
      <Button onClick={addNewTodo}>Add</Button>
    </div>
  );
};

const TodosContainer: FC = () => {
  const todos = useSignal([
    { text: "Buy groceries", completed: signal(false) },
    { text: "Clean the house", completed: signal(true) },
    { text: "Call mom", completed: signal(false) },
  ]);
  const totalNumberOfTodos = useComputed(() => todos.value.length);

  console.log("TodosContainer rendered!");

  const addTodo = (text: string) => {
    if (text.trim()) {
      todos.value = [...todos.value, { text, completed: signal(false) }];
    }
  };

  const removeTodo = (todo) => {
    todos.value = todos.value.filter((td) => td !== todo);
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">
        Todo List ({totalNumberOfTodos})
      </h1>
      <AddTodoButton addTodo={addTodo} />
      <TodoList removeTodo={removeTodo} todos={todos} />
    </div>
  );
};

export default TodosContainer;
