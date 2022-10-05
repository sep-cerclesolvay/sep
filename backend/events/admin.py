from import_export import resources
from import_export.admin import ImportMixin
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


class TicketRessource(resources.ModelResource):
    class Meta:
        model = Ticket
        skip_unchanged = True
        report_skipped = True
        fields = ('label', 'price', 'qrcode_id', 'event')
        import_id_fields = ['qrcode_id', 'event']

    def before_save_instance(self, instance, using_transactions, dry_run):
        print(instance)
        return super().before_save_instance(instance, using_transactions, dry_run)



@admin.register(Ticket)
class TicketAdmin(ImportMixin, admin.ModelAdmin):
    list_display = ('label', 'price', 'qrcode_id', 'event')
    list_filter = ('event',)
    search_fields = ('label', 'qrcode_id')
    resource_class = TicketRessource
