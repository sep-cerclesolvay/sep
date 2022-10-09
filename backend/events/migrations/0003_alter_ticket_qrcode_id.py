# Generated by Django 4.0.3 on 2022-10-09 10:46

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_alter_ticket_qrcode_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='qrcode_id',
            field=models.CharField(max_length=12, validators=[django.core.validators.RegexValidator('[A-Z0-9]{12}', message='The QR code identifier must contain exactly 12 characters in the A-Z,0-9 range')], verbose_name='QR code identifier'),
        ),
    ]
