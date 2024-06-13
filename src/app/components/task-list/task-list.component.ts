import { Component, input, output } from '@angular/core';
import { Task } from '../../../types/task';
import { NoTasksComponent } from '../no-tasks/no-tasks.component';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [TaskCardComponent, NoTasksComponent],
})
export class TaskListComponent {
  taskList = input<Task[]>();
  taskUpdateEvent = output<string>();
  taskDeleteEvent = output<string>();

  public updateTaskEvent(taskId: string): void {
    this.taskUpdateEvent.emit(taskId);
  }

  public deleteTaskEvent(taskId: string): void {
    this.taskDeleteEvent.emit(taskId);
  }
}
