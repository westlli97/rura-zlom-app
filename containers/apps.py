from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)

class ContainersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'containers'

    def ready(self):
        from .db_check import check_db
        check_db()