FROM python:3.11

# Ortam ayarları
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Sistem bağımlılıklarını yükle
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Bağımlılıkları kopyala ve yükle
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Çevresel değişkenleri en başta ekleyelim
COPY .env .env

# Uygulama kodlarını kopyala
COPY . .

# Statik dosyaları topla (SECRET_KEY ve STATIC_ROOT'in doğru olduğundan emin olun)
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Gunicorn ile uygulamayı başlat
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
