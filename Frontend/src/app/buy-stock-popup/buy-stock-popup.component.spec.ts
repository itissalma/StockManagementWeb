import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BuyStockPopupComponent } from './buy-stock-popup.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

describe('BuyStockPopupComponent', () => {
  let component: BuyStockPopupComponent;
  let fixture: ComponentFixture<BuyStockPopupComponent>;

  // Mocks
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockActivatedRoute = {
    params: {
      subscribe: (fn: (value: any) => void) => fn({})
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyStockPopupComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [MatDialogModule] // Add MatDialogModule to imports
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases based on your component's behavior

  it('should calculate total price correctly', () => {
    // Prepare a mock event object
    const mockEvent = {
      target: {
        value: '3' // Simulate the input value change
      }
    } as unknown as Event;
  
    // Set the initial quantity and stockData
    component.quantity = 2;
    component.stockData = { price: 10 };
  
    // Call the method with the mock event
    component.calculateTotalPrice();
  
    // Check the calculated total price
    expect(component.totalPrice).toEqual(30); // 3 * 10 = 30
  });
  

  it('should close the dialog', () => {
    // Test your closePopup() method
    component.closePopup();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  // Add more test cases as needed

});
