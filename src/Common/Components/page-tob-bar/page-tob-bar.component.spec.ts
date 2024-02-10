import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTobBarComponent } from './page-tob-bar.component';

describe('PageTobBarComponent', () => {
  let component: PageTobBarComponent;
  let fixture: ComponentFixture<PageTobBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTobBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTobBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
