# Generated by Django 3.2.16 on 2023-02-08 13:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    """
    Adding organization and barrier-free to POI
    """

    dependencies = [
        ("cms", "0060_user_distribute_sidebar_boxes"),
    ]

    operations = [
        migrations.AddField(
            model_name="poi",
            name="barrier_free",
            field=models.BooleanField(
                default=None,
                help_text="Indicate if the location is barrier free.",
                null=True,
                verbose_name="barrier free",
            ),
        ),
        migrations.AddField(
            model_name="poi",
            name="organization",
            field=models.ForeignKey(
                blank=True,
                help_text="Specify which organization operates this location.",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="pois",
                to="cms.organization",
                verbose_name="organization",
            ),
        ),
    ]
