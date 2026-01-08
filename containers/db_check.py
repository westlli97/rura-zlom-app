import logging
from django.db import connection

logger = logging.getLogger(__name__)

def check_db():
    logger.info("DB CHECK: start")

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            result = cursor.fetchone()
            logger.info(f"DB CHECK OK, result={result}")
    except Exception as e:
        logger.error("DB CHECK FAILED", exc_info=e)
