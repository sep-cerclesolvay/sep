from django.contrib import admin
from django.db.models import Count, Value
from django.db.models.functions import Coalesce
from django.urls import reverse
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _, ngettext_lazy

from .models import Event, Ticket


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name', 'number_of_tickets_sold')
    readonly_fields = ('number_of_tickets_sold',)

    @admin.display(description=_('number of tickets sold'), ordering='number_of_tickets_sold')
    def number_of_tickets_sold(self, obj):
        return format_html(
            '<a  href="{0}?event__id__exact={1}">{2}</a>&nbsp;',
            reverse('admin:events_ticket_changelist'),
            obj.id,
            ngettext_lazy(
                '%(count)s ticket', '%(count)s tickets', obj.number_of_tickets_sold
            ) % {'count': obj.number_of_tickets_sold}
        )

    def get_queryset(self, request):
        """Use this so we can annotate with additional info."""

        qs = super().get_queryset(request)
        return qs.annotate(number_of_tickets_sold=Coalesce(Count('ticket'), Value(0)))


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('label', 'price', 'qrcode_id', 'event')
    list_filter = ('event',)
    search_fields = ('label', 'qrcode_id')
