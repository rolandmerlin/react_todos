import React, { useEffect } from 'react';
import { useState, useRef } from 'react';

import './todo.css';

const Todos = () => {
    const [todos,updateTodos] = useState( JSON.parse( localStorage.getItem('todos') || '[]' ) );
    const [todo,updateTodo] = useState(
        {
            todoname:'',
            tododesc:''
        }
    );

    const current_id = useRef(
        Math.max(
            ...todos.map(t => (t.id*1).toFixed(0)),
            0
        ) +1
    );

    const sauveState = (t) => {
        localStorage.setItem('todos',JSON.stringify(t));
        return t;
    };

    const AddTodo = () => {
        updateTodos(
            sauveState([
                ...todos,
                {
                    ...todo,
                    'id':current_id.current
                }
            ])
        );
        updateTodo(        {
            todoname:'',
            tododesc:''
        });        
        current_id.current ++;
    };

    const DeleteTodo = (e) => {
        let id = e.target.getAttribute('data-id')*1
        updateTodos(
            sauveState(
                todos.filter(t => (t.id*1)!==id)
            )
        );
    }
    const ClearTodo = () => {
        updateTodos([]);
        sauveState([]);
        current_id.current = 1;
    }

    const handleChange = (e) => {
        updateTodo(
            {
                ...todo,
                [e.target.getAttribute('name')]:(e.target.value)
            }
        )
    }
    return (
        <main>
        <h1>TODOS React</h1>
        <div className="todos">
            <span>#</span>
            <span>
                <input type="text" name="todoname" value={todo.todoname} onChange={handleChange}/>
            </span>
            <span>
                <input type="text" name="tododesc" value={todo.tododesc} onChange={handleChange}/>
            </span>
            <span>
                <button id="add_todos_submit" onClick={AddTodo}>Ajouter</button>
            </span>
        </div>
        <div id="todos">
            {
                todos.map(t =>(
                    <div className="todos" key={`todo_${t.id}`}>
                        <span>{t.id}</span>
                        <span>{t.todoname}</span>
                        <span>{t.tododesc}</span>
                        <span><button data-id={t.id} onClick={DeleteTodo}>Supprimer</button></span>
                    </div>
                ))
            }
        </div>
        <div style={{textAlign:'center'}}>
            <br/>
            <button type="button" onClick={ClearTodo}>Vider toutes les tâches</button>
        </div>
    </main>
    );
};

export default Todos;