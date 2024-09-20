
# myapp/models.py
from django.db import models

class Exhibit(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    opening_hours = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Ticket(models.Model):
    ticket_id = models.CharField(max_length=10, unique=True , null=True)
    exhibit = models.ForeignKey(Exhibit, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    booked_on = models.DateTimeField(auto_now_add=True)
    visit_date = models.DateField(null=True)
    num_adults = models.PositiveIntegerField(null=True)
    num_children = models.PositiveIntegerField(null=True)
    num_senior_citizens = models.PositiveIntegerField(null=True)
    total_no_of_persons = models.PositiveIntegerField(null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    user_email = models.EmailField(null=True,unique=True)
    user_phone_num = models.IntegerField(null=True)

    def __str__(self):
        return f"Ticket for {self.exhibit.name} by {self.user_name}"
        
