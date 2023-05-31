import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataScienceProjectsComponent } from './data-science-projects.component';

describe('DataScienceProjectsComponent', () => {
  let component: DataScienceProjectsComponent;
  let fixture: ComponentFixture<DataScienceProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataScienceProjectsComponent]
    });
    fixture = TestBed.createComponent(DataScienceProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
