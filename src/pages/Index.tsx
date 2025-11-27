import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  title: string;
  price: number;
  area: number;
  rooms: number;
  district: string;
  type: string;
  image: string;
  isNew: boolean;
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    price: 15000000,
    area: 85,
    rooms: 3,
    district: 'Центральный',
    type: 'Квартира',
    image: 'https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/0c2b1951-acbf-4c7c-957f-fc019a941052.jpg',
    isNew: true
  },
  {
    id: 2,
    title: 'Просторный пентхаус с видом',
    price: 45000000,
    area: 180,
    rooms: 4,
    district: 'Набережный',
    type: 'Пентхаус',
    image: 'https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/04396469-3293-4494-899d-8f0daf6ab952.jpg',
    isNew: true
  },
  {
    id: 3,
    title: 'Уютная студия для молодых',
    price: 7500000,
    area: 42,
    rooms: 1,
    district: 'Деловой',
    type: 'Студия',
    image: 'https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/23a24205-3b25-4b9d-a2ea-cd46fd1276f1.jpg',
    isNew: false
  },
  {
    id: 4,
    title: 'Семейная квартира с балконом',
    price: 12000000,
    area: 95,
    rooms: 3,
    district: 'Зеленый',
    type: 'Квартира',
    image: 'https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/0c2b1951-acbf-4c7c-957f-fc019a941052.jpg',
    isNew: false
  },
  {
    id: 5,
    title: 'Элитные апартаменты премиум',
    price: 32000000,
    area: 145,
    rooms: 4,
    district: 'Центральный',
    type: 'Апартаменты',
    image: 'https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/23a24205-3b25-4b9d-a2ea-cd46fd1276f1.jpg',
    isNew: true
  },
  {
    id: 6,
    title: 'Компактная студия в новостройке',
    price: 6800000,
    area: 38,
    rooms: 1,
    district: 'Южный',
    type: 'Студия',
    image: 'https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/04396469-3293-4494-899d-8f0daf6ab952.jpg',
    isNew: true
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [areaRange, setAreaRange] = useState([0, 200]);

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesDistrict = selectedDistrict === 'all' || property.district === selectedDistrict;
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesArea = property.area >= areaRange[0] && property.area <= areaRange[1];
    
    return matchesSearch && matchesPrice && matchesDistrict && matchesType && matchesArea;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const resetFilters = () => {
    setPriceRange([0, 50000000]);
    setSelectedDistrict('all');
    setSelectedType('all');
    setAreaRange([0, 200]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Building2" className="text-primary" size={32} />
              <span className="text-2xl font-heading font-bold text-foreground">ВенгРос Real Estate</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`font-medium transition-colors ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className={`font-medium transition-colors ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('new')}
                className={`font-medium transition-colors ${
                  activeSection === 'new' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Новостройки
              </button>
              <button
                onClick={() => setActiveSection('services')}
                className={`font-medium transition-colors ${
                  activeSection === 'services' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Услуги
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`font-medium transition-colors ${
                  activeSection === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >Обо мне</button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`font-medium transition-colors ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Контакты
              </button>
            </div>
            <Button className="bg-secondary hover:bg-secondary/90">
              <Icon name="Phone" size={18} className="mr-2" />
              Позвонить
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/cd3cf7bb-e647-4b0b-94b4-1dd7394346bd.jpg')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-blue-900/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">Недвижимость Тюмени</h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-200">
              Премиальная недвижимость в лучших районах города
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              onClick={() => setActiveSection('catalog')}
            >
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-8 animate-fade-in">
            Каталог недвижимости
          </h2>

          <Card className="mb-8 shadow-lg animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Расширенный поиск
                </h3>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Сбросить
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Поиск по названию
                  </label>
                  <Input
                    placeholder="Введите название..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Тип недвижимости
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      <SelectItem value="Квартира">Квартира</SelectItem>
                      <SelectItem value="Студия">Студия</SelectItem>
                      <SelectItem value="Пентхаус">Пентхаус</SelectItem>
                      <SelectItem value="Апартаменты">Апартаменты</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Район
                  </label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите район" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все районы</SelectItem>
                      <SelectItem value="Центральный">Центральный</SelectItem>
                      <SelectItem value="Набережный">Набережный</SelectItem>
                      <SelectItem value="Деловой">Деловой</SelectItem>
                      <SelectItem value="Зеленый">Зеленый</SelectItem>
                      <SelectItem value="Южный">Южный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Площадь: {areaRange[0]} - {areaRange[1]} м²
                  </label>
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={areaRange}
                    onValueChange={setAreaRange}
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Цена: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    min={0}
                    max={50000000}
                    step={1000000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <Icon name="Info" size={18} className="text-primary" />
                <span>Найдено объектов: {filteredProperties.length}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {property.isNew && (
                    <Badge className="absolute top-4 right-4 bg-secondary text-white">
                      Новое
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-primary border-primary">
                      {property.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{property.district}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Maximize" size={16} className="text-primary" />
                      <span>{property.area} м²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Home" size={16} className="text-primary" />
                      <span>{property.rooms} комн</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span>Карта</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-heading font-bold text-primary">
                      {formatPrice(property.price)}
                    </span>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <Icon name="SearchX" size={64} className="mx-auto text-muted mb-4" />
              <h3 className="text-xl font-heading font-semibold text-muted-foreground mb-2">
                Ничего не найдено
              </h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              <Button onClick={resetFilters} className="mt-4">
                Сбросить фильтры
              </Button>
            </div>
          )}
        </section>
      )}

      {activeSection === 'new' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-8 animate-fade-in">
            Новостройки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties
              .filter(p => p.isNew)
              .map((property, index) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-secondary text-white">
                      Новостройка
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-lg text-slate-800 mb-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-primary border-primary">
                        {property.type}
                      </Badge>
                      <span className="text-sm text-slate-500">{property.district}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Icon name="Maximize" size={16} className="text-primary" />
                        <span>{property.area} м²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Home" size={16} className="text-primary" />
                        <span>{property.rooms} комн</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={16} className="text-primary" />
                        <span>Карта</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-heading font-bold text-primary">
                        {formatPrice(property.price)}
                      </span>
                      <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      )}

      {activeSection === 'services' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-8 text-center animate-fade-in">
            Наши услуги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: 'Search',
                title: 'Подбор недвижимости',
                description: 'Поможем найти идеальный вариант согласно вашим требованиям и бюджету'
              },
              {
                icon: 'FileCheck',
                title: 'Юридическое сопровождение',
                description: 'Полная проверка документов и безопасное оформление сделки'
              },
              {
                icon: 'Calculator',
                title: 'Ипотечное консультирование',
                description: 'Помощь в выборе банка и оформлении ипотеки на выгодных условиях'
              },
              {
                icon: 'TrendingUp',
                title: 'Инвестиционные решения',
                description: 'Консультации по выгодным инвестициям в недвижимость'
              },
              {
                icon: 'Home',
                title: 'Управление объектами',
                description: 'Профессиональное управление и обслуживание вашей недвижимости'
              },
              {
                icon: 'Users',
                title: 'Персональный менеджер',
                description: 'Индивидуальное сопровождение на всех этапах сделки'
              }
            ].map((service, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={service.icon} size={32} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-8 text-center">обо мне</h2>
            <Card className="p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div>
                  <img
                    src="https://cdn.poehali.dev/projects/c06123cb-de11-4378-852d-5693d39fec63/files/0c2b1951-acbf-4c7c-957f-fc019a941052.jpg"
                    alt="О компании"
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">ВенгРос Real Estate - Ваш надежный партнер</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">Я — Оксана Венгрусова, опытный специалист в сфере недвижимости. Знаете, почему тысячи клиентов выбирают именно меня? Потому что кроме профессиональной консультации и качественного сопровождения сделок я искренне благодарна каждому своему клиенту и дарю персональный бонус в размере 50 000 рублей сразу после успешного приобретения недвижимости</p>
                  <p className="text-muted-foreground leading-relaxed"></p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center pt-8 border-t border-border">
                <div>
                  <div className="text-4xl font-heading font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground">Лет на рынке</div>
                </div>
                <div>
                  <div className="text-4xl font-heading font-bold text-primary mb-2">5000+</div>
                  <div className="text-muted-foreground">Довольных клиентов</div>
                </div>
                <div>
                  <div className="text-4xl font-heading font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Успешных сделок</div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-8 text-center">
              Контакты
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 shadow-xl">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">ВенгРос Real Estate - Ваш надежный партнер</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Телефон</div>
                      <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-muted-foreground">info@primeestate.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Адрес</div>
                      <div className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Часы работы</div>
                      <div className="text-muted-foreground">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-8 shadow-xl">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Оставьте заявку
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Ваше имя
                    </label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Телефон
                    </label>
                    <Input placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="example@mail.ru" />
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-card border-t border-border text-foreground py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" size={28} />
                <span className="text-xl font-heading font-bold">ВенгРос Real Estate</span>
              </div>
              <p className="text-muted-foreground text-sm"></p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-primary transition-colors">Главная</button></li>
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('new')} className="hover:text-primary transition-colors">Новостройки</button></li>
                <li><button onClick={() => setActiveSection('services')} className="hover:text-primary transition-colors">Услуги</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveSection('about')} className="hover:text-primary transition-colors">О нас</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-primary transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (904) 491-90-95</li>
                <li>oxana.vengrusova@yandex.ru</li>
                <li>г.Тюмень</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 PrimeEstate. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;