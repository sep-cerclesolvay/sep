# Generated by Django 3.2.6 on 2021-09-14 18:05

from django.db import migrations, models


def copy_creation_date_to_updated_date_for_entry(apps, schema_editor):
    Entry = apps.get_model("sep_inventory", "entry")
    for entry in Entry.objects.filter(updated_date=None):
        entry.updated_date = entry.created_date
        entry.save()


def copy_creation_date_to_updated_date_for_sale(apps, schema_editor):
    Sale = apps.get_model("sep_inventory", "sale")
    for sale in Sale.objects.filter(updated_date=None):
        sale.updated_date = sale.created_date
        sale.save()


class Migration(migrations.Migration):

    dependencies = [
        ('sep_inventory', '0006_alter_saleitem_unique_together'),
    ]

    operations = [
        migrations.RunPython(copy_creation_date_to_updated_date_for_entry),
        migrations.AlterField(
            model_name='entry',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='entry',
            name='updated_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.RunPython(copy_creation_date_to_updated_date_for_sale),
        migrations.AlterField(
            model_name='sale',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='updated_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
