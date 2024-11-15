
'''


# Create your tests here.
from django.test import TestCase
from django.utils import timezone
from .models import Exhibit, Ticket


class ExhibitModelTests(TestCase):
    
    def setUp(self):
        # This method will run before each test
        self.exhibit = Exhibit.objects.create(
            name='Ancient Artifacts',
            description='A collection of ancient artifacts from around the world.',
            opening_hours='9 AM to 5 PM'
        )
    
    def test_exhibit_str(self):
        # Test the __str__ method of the Exhibit model
        self.assertEqual(str(self.exhibit), 'Ancient Artifacts')

class TicketModelTests(TestCase):
    
    def setUp(self):
        # Create an Exhibit instance for the tests
        self.exhibit = Exhibit.objects.create(
            name='Medieval History',
            description='Explore the medieval period through various exhibits.',
            opening_hours='10 AM to 6 PM'
        )
        # Create a Ticket instance for the tests
        self.ticket = Ticket.objects.create(
            exhibit=self.exhibit,
            user_name='John Doe'
        )
    
    def test_ticket_str(self):
        # Test the __str__ method of the Ticket model
        expected_str = f'Ticket for {self.exhibit.name} by {self.ticket.user_name}'
        self.assertEqual(str(self.ticket), expected_str)

    def test_ticket_creation(self):
        # Test that a Ticket is correctly created
        self.assertEqual(Ticket.objects.count(), 1)
        ticket = Ticket.objects.get(id=self.ticket.id)
        self.assertEqual(ticket.user_name, 'John Doe')
        self.assertEqual(ticket.exhibit, self.exhibit)
        self.assertIsNotNone(ticket.booked_on)  # booked_on should be set automatically
'''
