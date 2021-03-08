import { Component } from 'react';
import { Status } from '../containers/Status/Status';
import { TaskModel } from '../models/task.model'
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [
                // new TaskModel(1, 'new', 'Task 01'),
                // new TaskModel(2, 'hold', 'Task 02'),
                // new TaskModel(3, 'progress', 'Task 03'),
                // new TaskModel(4, 'done', 'Task 04')
            ]
        };
    }

    addNewTaskHandler = (newTask) => {
        const prevTasks = [...this.state.tasks];

        prevTasks.push(new TaskModel(this.state.tasks.length + 1, 'new', newTask));
        
        const updatedTasks = [...prevTasks];

        this.setState({ tasks: updatedTasks });   
    }

    changeStatusHandler = (status, taskId) => {
        const updatedTasks = this.state.tasks.map(task => {
            task.status = task._id === taskId ? status : task.status;
            return task;
        });

        this.setState({ tasks: updatedTasks});
    }

    render() {
        const newTasks = this.state.tasks.filter(task => task.status === 'new');
        const holdTasks = this.state.tasks.filter(task => task.status === 'hold');
        const progressTasks = this.state.tasks.filter(task => task.status === 'progress');
        const doneTasks = this.state.tasks.filter(task => task.status === 'done');

        return(
            <div className="App">
                <Status tasks={ newTasks } status={ 'New' } addNewTask={ ($event) => this.addNewTaskHandler($event) } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) }/>
                <Status tasks={ holdTasks } status={ 'Hold' } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) } />
                <Status tasks={ progressTasks } status={ 'Progress' } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) } />
                <Status tasks={ doneTasks } status={ 'Done' } changedStatus={ ($event, taskId) => this.changeStatusHandler($event, taskId) } />
            </div>
        )
    }
}

export default App;
