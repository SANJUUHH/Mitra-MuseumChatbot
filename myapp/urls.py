# myapp/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('book-ticket/', views.book_ticket, name='book_ticket'),
    path('cancel-ticket/', views.cancel_ticket, name='cancel_ticket'),
    path('exhibit-info/', views.exhibit_info, name='exhibit_info'),
]
