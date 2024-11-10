import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGComponent } from './search-g.component';

describe('SearchGComponent', () => {
  let component: SearchGComponent;
  let fixture: ComponentFixture<SearchGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
