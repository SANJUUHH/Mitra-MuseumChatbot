#myapp/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Exhibit, Ticket
import json
from datetime import datetime
import random

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def book_ticket(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_name = data.get('user_name')
        visit_date = data.get('visit_date')
        num_adults = data.get('num_adults', 0)
        num_children = data.get('num_children', 0)
        num_senior_citizens = data.get('num_senior_citizens', 0)
        user_email = data.get('user_email')
        user_phone_num = data.get('user_phone_num')
        
        if user_name and visit_date:
            try:
                visit_date_obj = datetime.strptime(visit_date, "%Y-%m-%d")
                if visit_date_obj < datetime.now():
                    return JsonResponse({'message': 'Visit date must be in the future.'}, status=400)
            except ValueError:
                return JsonResponse({'message': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)

            exhibit = Exhibit.objects.first() 

            def generate_ticket_id():
                ticket_id = random.randint(1000, 9999)
                while Ticket.objects.filter(ticket_id=ticket_id).exists():  # Ensure uniqueness of the custom ticket ID
                    ticket_id = random.randint(1000, 9999)
                return ticket_id

            ticket_id = generate_ticket_id()

            total_price = calculate_price(num_adults, num_children, num_senior_citizens)

            total_no_of_persons = (num_adults + num_children + num_senior_citizens)


            ticket = Ticket.objects.create(
                exhibit=exhibit,
                user_name=user_name, 
                visit_date=visit_date, 
                ticket_id=ticket_id,
                num_adults=num_adults,
                num_children=num_children,
                num_senior_citizens=num_senior_citizens,
                total_no_of_persons = total_no_of_persons,
                total_price=total_price,
                user_email = user_email,
                user_phone_num = user_phone_num,
                )
            
            return JsonResponse({
                'message': 'Ticket booked Successfully!',
                'ticket_id': ticket.ticket_id,  
                'exhibit_name': exhibit.name,
                'visit_date': visit_date,
                'total_no_of_persons': total_no_of_persons,
                'total_price': ticket.total_price,
                'user_email': ticket.user_email,
                'user_phone_num':ticket.user_phone_num,
            })

        return JsonResponse({'message': 'Invalid input.'}, status=400)

def calculate_price(adults, children, senior_citizens):
    price_per_adult = 20  # Example price
    price_per_child = 10  # Example price
    price_per_senior = 15  # Example price
    return (adults * price_per_adult) + (children * price_per_child) + (senior_citizens * price_per_senior)


@csrf_exempt
def cancel_ticket(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        ticket_id = data.get('ticket_id')

        try:
            ticket = Ticket.objects.get(ticket_id=ticket_id)  # Query by custom ticket ID
            ticket.delete()
            return JsonResponse({'message': 'Ticket canceled'})
        except Ticket.DoesNotExist:
            return JsonResponse({'message': 'Ticket not found'}, status=404)

def exhibit_info(request):
    exhibits = Exhibit.objects.all().values('name', 'description', 'opening_hours')
    exhibit_list = list(exhibits)
    return JsonResponse(exhibit_list, safe=False)
