from unicodedata import name
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from sep_custom_auth.models import User
from .models import Event, Ticket


class EventAPITests(APITestCase):

    def setUp(self):
        user = User.objects.create(name='testuser')
        token = Token.objects.create(user=user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token.key)

    def create_event_1(self):
        return Event.objects.create(name='Event 1')

    def create_event_2(self):
        return Event.objects.create(name='Event 2')

    def create_ticket_1(self):
        event, _ = Event.objects.get_or_create(pk=1, name='Event 1')
        return Ticket.objects.create(
            label='1 Seat VIP', price=49.99, qrcode_id='AZERTY12', event=event)

    def create_ticket_2(self):
        event, _ = Event.objects.get_or_create(pk=1, name='Event 1')
        return Ticket.objects.create(
            label='1 Seat VIP', price=49.99, qrcode_id='ABCDEFGH', event=event)

    def serialize_event(self, event):
        return {'id': event.pk, 'name': event.name}

    def serialize_ticket(self, ticket):
        return {'label': ticket.label, 'price': f'{ticket.price}'}

    def test_list_events_empty(self):
        url = reverse('events:event-list')
        response = self.client.get(url)
        self.assertEqual(Event.objects.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_list_events_one(self):
        event1 = self.create_event_1()
        url = reverse('events:event-list')
        response = self.client.get(url)
        self.assertEqual(Event.objects.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [self.serialize_event(event1)])

    def test_list_events_two(self):
        event1 = self.create_event_1()
        event2 = self.create_event_2()
        url = reverse('events:event-list')
        response = self.client.get(url)
        self.assertEqual(Event.objects.count(), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [self.serialize_event(
            event1), self.serialize_event(event2)])

    def test_get_ticket_detail_from_qrcode(self):
        self.create_ticket_1()
        ticket = self.create_ticket_2()
        url = reverse('events:event-qrcode',
                      kwargs={'pk': ticket.event.id, 'ticket__qrcode_id': ticket.qrcode_id})
        response = self.client.get(url)
        self.assertEqual(Ticket.objects.count(), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.serialize_ticket(ticket))
