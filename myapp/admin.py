# myapp/admin.py
from django.contrib import admin
from .models import Exhibit, Ticket

@admin.register(Exhibit)
class ExhibitAdmin(admin.ModelAdmin):
    list_display = ('name', 'opening_hours')  
    search_fields = ('name',)  

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'exhibit', 'booked_on',) 
    list_filter = ('exhibit',)  
    search_fields = ('user_name',)
