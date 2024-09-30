"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Clock, Edit } from "lucide-react";
import { FC } from "react";
import TodoList from "./TodosContainer";

const TodoApp: FC = () => {
  const tasks = [
    {
      title: "Draft Project Proposal",
      dueDate: "Tue Oct 17 2023",
      status: "red",
    },
    { title: "Take Trash Out", dueDate: "Wed Oct 18 2023", status: "yellow" },
    { title: "Get Groceries", dueDate: "Wed Oct 18 2023", status: "yellow" },
    { title: "Send Mail", dueDate: "Wed Oct 18 2023", status: "yellow" },
  ];

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Todo App</h1>
      <nav className="flex space-x-4 mb-6">
        <Button variant="outline" className="bg-gray-200">
          Today
        </Button>
        <Button variant="outline">Pending</Button>
        <Button variant="outline">Overdue</Button>
      </nav>
      <div className="flex flex-col w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <div className="bg-white rounded-lg shadow-md">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b"
            >
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-lg">{task.title}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span className="text-sm text-gray-500">{task.dueDate}</span>
                <div
                  className={`ml-4 w-3 h-3 rounded-full bg-${task.status}`}
                ></div>
                <Edit className="ml-4 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4 bg-green-500 text-white">Add Task</Button>
      </div>
      <div className="mt-6 flex items-center">
        <span className="text-lg font-semibold">Completed</span>
        <ChevronDown className="ml-2 cursor-pointer" />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <>
      <TodoList />
    </>
  );
};

export default page;
