import { Component, input } from '@angular/core';
import { Task } from '../../../types/task';

@Component({
  selector: 'app-task-badges',
  templateUrl: './task-badges.component.html',
  styleUrls: ['./task-badges.component.css'],
  standalone: true,
})
export class TaskBadgesComponent {
  public totalTasks = input<Task[]>([]);
  public completeTasks = input<number>(0);
  public incompleteTasks = input<number>(0);
}
