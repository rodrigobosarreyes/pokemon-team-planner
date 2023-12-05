import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {TeamPreviewComponent} from './features/team-planner/team-preview/team-preview.component';
import {AnalysisComponent} from './features/team-planner/analysis/analysis.component';
import {SearchComponent} from './features/team-planner/search/search.component';
import {Store} from '@ngrx/store';
import {selectTeam} from './core/store/team.selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TeamPreviewComponent, AnalysisComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokemon-team-planner';

  team$ = this.store.select(selectTeam);

  constructor(private store: Store) {}
}
