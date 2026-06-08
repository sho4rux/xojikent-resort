<template>
  <!-- LOGIN -->
  <div v-if="!auth" class="login-page">
    <div class="login-card">
      <div class="login-logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L4 10v20h8v-8h8v8h8V10L16 2z" fill="#2d6a4f" opacity="0.9"/>
          <path d="M16 2L4 10h24L16 2z" fill="#2d6a4f"/>
        </svg>
        <span>Admin Panel</span>
      </div>
      <h2>Вход в панель управления</h2>
      <p>Hojikent Oromgohi</p>
      <form @submit.prevent="doLogin">
        <div class="login-field">
          <label>Пароль</label>
          <input
            :type="showPwd ? 'text' : 'password'"
            v-model="pwdInput"
            placeholder="Введите пароль"
            autofocus
          />
          <button type="button" class="pwd-toggle" @click="showPwd = !showPwd">
            {{ showPwd ? '🙈' : '👁' }}
          </button>
        </div>
        <div v-if="loginError" class="login-error">Неверный пароль</div>
        <button type="submit" class="login-btn">Войти</button>
      </form>
    </div>
  </div>

  <!-- ADMIN SHELL -->
  <div v-else class="admin-shell">

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar__logo">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L4 10v20h8v-8h8v8h8V10L16 2z" fill="#52b788" opacity="0.9"/>
          <path d="M16 2L4 10h24L16 2z" fill="#52b788"/>
        </svg>
        <div>
          <div class="sidebar__logo-main">HOJIKENT</div>
          <div class="sidebar__logo-sub">Admin Panel</div>
        </div>
      </div>

      <nav class="sidebar__nav">
        <button
          v-for="s in sections"
          :key="s.id"
          class="sidebar__item"
          :class="{ active: activeSection === s.id }"
          @click="activeSection = s.id"
        >
          <span class="sidebar__icon" v-html="s.icon"></span>
          <span>{{ s.label }}</span>
        </button>
      </nav>

      <div class="sidebar__footer">
        <a href="/#/" target="_blank" class="sidebar__action sidebar__action--view">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Открыть сайт
        </a>
        <button class="sidebar__action sidebar__action--reset" @click="confirmReset">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.61"/></svg>
          Сбросить данные
        </button>
        <button class="sidebar__action sidebar__action--logout" @click="logout">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Выйти
        </button>
      </div>
    </aside>

    <!-- Content -->
    <main class="admin-main">
      <header class="admin-topbar">
        <h1>{{ currentSectionLabel }}</h1>
        <div class="topbar-right">
          <Transition name="toast">
            <div v-if="saved" class="save-toast">✓ Сохранено</div>
          </Transition>
        </div>
      </header>

      <div class="admin-content">

        <!-- ===== HERO ===== -->
        <template v-if="activeSection === 'hero'">
          <div class="editor-card">
            <div class="card-head">Текст и кнопки</div>
            <div class="card-body fields-grid">
              <field-wrap label="Бейдж"><input v-model="d.hero.badge" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок (часть 1)"><input v-model="d.hero.title" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок курсив"><input v-model="d.hero.titleItalic" @input="flash" /></field-wrap>
              <field-wrap label="Подзаголовок (\\n = новая строка)"><textarea v-model="d.hero.subtitle" rows="2" @input="flash"></textarea></field-wrap>
              <field-wrap label="Кнопка «Забронировать»"><input v-model="d.hero.btnBook" @input="flash" /></field-wrap>
              <field-wrap label="Кнопка «Узнать больше»"><input v-model="d.hero.btnLearn" @input="flash" /></field-wrap>
              <field-wrap label="Текст прокрутки"><input v-model="d.hero.scrollText" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              Статистика
              <button class="btn-add" @click="d.hero.stats.push({ value: '', label: '' }); flash()">+ Добавить</button>
            </div>
            <div class="card-body">
              <div v-for="(stat, i) in d.hero.stats" :key="i" class="row-item">
                <input v-model="stat.value" placeholder="Значение (напр. 400+)" @input="flash" />
                <input v-model="stat.label" placeholder="Подпись" @input="flash" />
                <button class="btn-del" @click="d.hero.stats.splice(i, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              Слайдер фотографий
              <button class="btn-add" @click="d.hero.images.push({ src: '/images/', rotation: 0 }); flash()">+ Добавить</button>
            </div>
            <div class="card-body img-list">
              <div v-for="(img, i) in d.hero.images" :key="i" class="img-row">
                <div class="img-thumb" @click="openPicker(img)">
                  <img :src="img.src" :style="imgRotationStyle(img.rotation)" />
                  <div class="img-thumb-overlay">Выбрать</div>
                </div>
                <div class="img-row-fields">
                  <input v-model="img.src" placeholder="/images/..." @input="flash" />
                  <div class="rotation-ctrl">
                    <button @click="rotateImage(img, 'left'); flash()">⟲ −90°</button>
                    <span class="rotation-val">{{ img.rotation }}°</span>
                    <button @click="rotateImage(img, 'right'); flash()">⟳ +90°</button>
                  </div>
                </div>
                <div class="img-row-actions">
                  <button class="btn-icon" @click="moveItem(d.hero.images, i, -1)" :disabled="i === 0">↑</button>
                  <button class="btn-icon" @click="moveItem(d.hero.images, i, 1)" :disabled="i === d.hero.images.length - 1">↓</button>
                  <button class="btn-del" @click="d.hero.images.splice(i, 1); flash()">✕</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ===== ABOUT ===== -->
        <template v-else-if="activeSection === 'about'">
          <div class="editor-card">
            <div class="card-head">Заголовки</div>
            <div class="card-body fields-grid">
              <field-wrap label="Метка раздела"><input v-model="d.about.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок (\\n = строка)"><textarea v-model="d.about.title" rows="2" @input="flash"></textarea></field-wrap>
              <field-wrap label="Значок (число)"><input v-model="d.about.badgeNumber" @input="flash" /></field-wrap>
              <field-wrap label="Значок (текст, \\n = строка)"><input v-model="d.about.badgeText" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              Параграфы
              <button class="btn-add" @click="d.about.paragraphs.push(''); flash()">+ Добавить</button>
            </div>
            <div class="card-body">
              <div v-for="(p, i) in d.about.paragraphs" :key="i" class="row-item">
                <textarea v-model="d.about.paragraphs[i]" rows="3" @input="flash"></textarea>
                <button class="btn-del" @click="d.about.paragraphs.splice(i, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              Особенности (4 карточки)
              <button class="btn-add" @click="d.about.features.push({ title: '', desc: '', iconKey: 'star' }); flash()">+ Добавить</button>
            </div>
            <div class="card-body">
              <div v-for="(f, i) in d.about.features" :key="i" class="feature-row">
                <div class="feature-icon-pick">
                  <div class="icon-preview" v-html="iconPresets[f.iconKey] || ''"></div>
                  <select v-model="f.iconKey" @change="flash">
                    <option v-for="k in Object.keys(iconPresets)" :key="k" :value="k">{{ k }}</option>
                  </select>
                </div>
                <input v-model="f.title" placeholder="Название" @input="flash" />
                <input v-model="f.desc" placeholder="Описание" @input="flash" />
                <button class="btn-del" @click="d.about.features.splice(i, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">Фотографии</div>
            <div class="card-body img-list">
              <div class="img-row">
                <div class="img-thumb" @click="openPicker(d.about.imageMain)">
                  <img :src="d.about.imageMain.src" :style="imgRotationStyle(d.about.imageMain.rotation)" />
                  <div class="img-thumb-overlay">Выбрать</div>
                </div>
                <div class="img-row-fields">
                  <label class="field-label">Главное фото</label>
                  <input v-model="d.about.imageMain.src" @input="flash" />
                  <div class="rotation-ctrl">
                    <button @click="rotateImage(d.about.imageMain, 'left'); flash()">⟲ −90°</button>
                    <span class="rotation-val">{{ d.about.imageMain.rotation }}°</span>
                    <button @click="rotateImage(d.about.imageMain, 'right'); flash()">⟳ +90°</button>
                  </div>
                </div>
              </div>
              <div class="img-row">
                <div class="img-thumb" @click="openPicker(d.about.imageSecondary)">
                  <img :src="d.about.imageSecondary.src" :style="imgRotationStyle(d.about.imageSecondary.rotation)" />
                  <div class="img-thumb-overlay">Выбрать</div>
                </div>
                <div class="img-row-fields">
                  <label class="field-label">Второе фото</label>
                  <input v-model="d.about.imageSecondary.src" @input="flash" />
                  <div class="rotation-ctrl">
                    <button @click="rotateImage(d.about.imageSecondary, 'left'); flash()">⟲ −90°</button>
                    <span class="rotation-val">{{ d.about.imageSecondary.rotation }}°</span>
                    <button @click="rotateImage(d.about.imageSecondary, 'right'); flash()">⟳ +90°</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ===== SERVICES ===== -->
        <template v-else-if="activeSection === 'services'">
          <div class="editor-card">
            <div class="card-head">Заголовки раздела</div>
            <div class="card-body fields-grid">
              <field-wrap label="Метка"><input v-model="d.services.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок"><input v-model="d.services.title" @input="flash" /></field-wrap>
              <field-wrap label="Подзаголовок"><input v-model="d.services.subtitle" @input="flash" /></field-wrap>
              <field-wrap label="Сноска"><input v-model="d.services.note" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card" v-for="(svc, i) in d.services.items" :key="i">
            <div class="card-head">
              Услуга {{ i + 1 }}: {{ svc.title || '(без названия)' }}
              <button class="btn-del-sm" @click="d.services.items.splice(i, 1); flash()">Удалить</button>
            </div>
            <div class="card-body">
              <div class="service-editor">
                <div class="img-thumb lg" @click="openPicker(svc)">
                  <img :src="svc.img" :style="imgRotationStyle(svc.rotation)" />
                  <div class="img-thumb-overlay">Выбрать фото</div>
                </div>
                <div class="service-fields">
                  <div class="fields-grid">
                    <field-wrap label="Название"><input v-model="svc.title" @input="flash" /></field-wrap>
                    <field-wrap label="CTA кнопка"><input v-model="svc.cta" @input="flash" /></field-wrap>
                    <field-wrap label="Цена"><input v-model="svc.price" @input="flash" /></field-wrap>
                    <field-wrap label="Единица (напр. сум / ночь)"><input v-model="svc.unit" @input="flash" /></field-wrap>
                    <field-wrap label="Иконка">
                      <div class="icon-select-row">
                        <div class="icon-preview" v-html="iconPresets[svc.iconKey] || ''"></div>
                        <select v-model="svc.iconKey" @change="flash">
                          <option v-for="k in Object.keys(iconPresets)" :key="k" :value="k">{{ k }}</option>
                        </select>
                      </div>
                    </field-wrap>
                  </div>
                  <field-wrap label="Описание">
                    <textarea v-model="svc.desc" rows="3" @input="flash"></textarea>
                  </field-wrap>
                  <field-wrap label="Путь к фото">
                    <input v-model="svc.img" @input="flash" />
                  </field-wrap>
                  <div class="rotation-ctrl">
                    <button @click="rotateImage(svc, 'left'); flash()">⟲ −90°</button>
                    <span class="rotation-val">{{ svc.rotation }}°</span>
                    <button @click="rotateImage(svc, 'right'); flash()">⟳ +90°</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="btn-add-card" @click="d.services.items.push({ title: '', desc: '', img: '/images/', rotation: 0, price: '', unit: '', cta: 'Подробнее', iconKey: 'star' }); flash()">
            + Добавить услугу
          </button>
        </template>

        <!-- ===== ROOMS ===== -->
        <template v-else-if="activeSection === 'rooms'">
          <div class="editor-card">
            <div class="card-head">Заголовки раздела</div>
            <div class="card-body fields-grid">
              <field-wrap label="Метка"><input v-model="d.rooms.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок"><input v-model="d.rooms.title" @input="flash" /></field-wrap>
              <field-wrap label="Подзаголовок"><input v-model="d.rooms.subtitle" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              Фильтр-табы
              <button class="btn-add" @click="d.rooms.tabs.push({ id: 'new', label: '' }); flash()">+ Добавить</button>
            </div>
            <div class="card-body">
              <div v-for="(tab, i) in d.rooms.tabs" :key="i" class="row-item">
                <input v-model="tab.id" placeholder="ID (напр. standard)" @input="flash" style="max-width:140px" />
                <input v-model="tab.label" placeholder="Название" @input="flash" />
                <button class="btn-del" @click="d.rooms.tabs.splice(i, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card" v-for="(room, i) in d.rooms.items" :key="i">
            <div class="card-head">
              {{ room.name || `Номер ${i + 1}` }}
              <div class="card-head-actions">
                <button class="btn-icon" @click="moveItem(d.rooms.items, i, -1)" :disabled="i === 0">↑</button>
                <button class="btn-icon" @click="moveItem(d.rooms.items, i, 1)" :disabled="i === d.rooms.items.length - 1">↓</button>
                <button class="btn-del-sm" @click="d.rooms.items.splice(i, 1); flash()">Удалить</button>
              </div>
            </div>
            <div class="card-body">
              <div class="service-editor">
                <div class="img-thumb lg" @click="openPicker(room)">
                  <img :src="room.img" :style="imgRotationStyle(room.rotation)" />
                  <div class="img-thumb-overlay">Выбрать фото</div>
                </div>
                <div class="service-fields">
                  <div class="fields-grid">
                    <field-wrap label="Название номера"><input v-model="room.name" @input="flash" /></field-wrap>
                    <field-wrap label="Тип">
                      <select v-model="room.type" @change="flash">
                        <option v-for="tab in d.rooms.tabs.filter(t => t.id !== 'all')" :key="tab.id" :value="tab.id">{{ tab.label }}</option>
                      </select>
                    </field-wrap>
                    <field-wrap label="Цена (сум/ночь)"><input v-model="room.price" @input="flash" /></field-wrap>
                    <field-wrap label="Путь к фото"><input v-model="room.img" @input="flash" /></field-wrap>
                  </div>
                  <field-wrap label="Описание">
                    <textarea v-model="room.desc" rows="3" @input="flash"></textarea>
                  </field-wrap>
                  <div class="rotation-ctrl" style="margin-bottom:12px">
                    <button @click="rotateImage(room, 'left'); flash()">⟲ −90°</button>
                    <span class="rotation-val">{{ room.rotation }}°</span>
                    <button @click="rotateImage(room, 'right'); flash()">⟳ +90°</button>
                  </div>
                  <div class="details-editor">
                    <label class="field-label">Удобства (теги)</label>
                    <div class="tags-row">
                      <span v-for="(det, di) in room.details" :key="di" class="tag">
                        {{ det }}
                        <button @click="room.details.splice(di, 1); flash()">×</button>
                      </span>
                      <input
                        class="tag-input"
                        placeholder="+ Добавить"
                        @keydown.enter.prevent="e => { if(e.target.value.trim()) { room.details.push(e.target.value.trim()); e.target.value = ''; flash() } }"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="btn-add-card" @click="d.rooms.items.push({ img: '/images/', rotation: 0, name: '', type: d.rooms.tabs[1]?.id || 'standard', price: '', desc: '', details: [] }); flash()">
            + Добавить номер
          </button>
        </template>

        <!-- ===== GALLERY ===== -->
        <template v-else-if="activeSection === 'gallery'">
          <div class="editor-card">
            <div class="card-head">Заголовки раздела</div>
            <div class="card-body fields-grid">
              <field-wrap label="Метка"><input v-model="d.gallery.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок"><input v-model="d.gallery.title" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              Фотографии галереи ({{ d.gallery.images.length }} шт.)
              <button class="btn-add" @click="d.gallery.images.push({ src: '/images/', alt: '', size: '', rotation: 0 }); flash()">+ Добавить</button>
            </div>
            <div class="card-body img-list">
              <div v-for="(img, i) in d.gallery.images" :key="i" class="img-row">
                <div class="img-thumb" @click="openPicker(img)">
                  <img :src="img.src" :style="imgRotationStyle(img.rotation)" />
                  <div class="img-thumb-overlay">Выбрать</div>
                </div>
                <div class="img-row-fields">
                  <input v-model="img.src" placeholder="/images/..." @input="flash" />
                  <input v-model="img.alt" placeholder="Alt текст" @input="flash" />
                  <div class="gallery-size-row">
                    <label class="field-label">Размер:</label>
                    <label><input type="radio" v-model="img.size" value="" @change="flash" /> Обычный</label>
                    <label><input type="radio" v-model="img.size" value="wide" @change="flash" /> Широкий (2 колонки)</label>
                    <label><input type="radio" v-model="img.size" value="tall" @change="flash" /> Высокий (2 строки)</label>
                  </div>
                  <div class="rotation-ctrl">
                    <button @click="rotateImage(img, 'left'); flash()">⟲ −90°</button>
                    <span class="rotation-val">{{ img.rotation }}°</span>
                    <button @click="rotateImage(img, 'right'); flash()">⟳ +90°</button>
                  </div>
                </div>
                <div class="img-row-actions">
                  <button class="btn-icon" @click="moveItem(d.gallery.images, i, -1)" :disabled="i === 0">↑</button>
                  <button class="btn-icon" @click="moveItem(d.gallery.images, i, 1)" :disabled="i === d.gallery.images.length - 1">↓</button>
                  <button class="btn-del" @click="d.gallery.images.splice(i, 1); flash()">✕</button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ===== CONTACT ===== -->
        <template v-else-if="activeSection === 'contact'">
          <div class="editor-card">
            <div class="card-head">Заголовки и тексты</div>
            <div class="card-body fields-grid">
              <field-wrap label="Метка"><input v-model="d.contact.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок"><input v-model="d.contact.title" @input="flash" /></field-wrap>
              <field-wrap label="Заголовок формы"><input v-model="d.contact.formTitle" @input="flash" /></field-wrap>
              <field-wrap label="Подпись формы"><input v-model="d.contact.formSubtitle" @input="flash" /></field-wrap>
              <field-wrap label="Сообщение об успехе"><input v-model="d.contact.successMessage" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">Контактная информация</div>
            <div class="card-body fields-grid">
              <field-wrap label="Адрес"><textarea v-model="d.contact.address" rows="2" @input="flash"></textarea></field-wrap>
              <field-wrap label="Телефон"><input v-model="d.contact.phone" @input="flash" /></field-wrap>
              <field-wrap label="Email"><input v-model="d.contact.email" @input="flash" /></field-wrap>
              <field-wrap label="Режим работы"><input v-model="d.contact.hours" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">Карта Google Maps</div>
            <div class="card-body">
              <field-wrap label="URL embed (из Google Maps → Поделиться → Встроить карту → src=&quot;...&quot;)">
                <textarea v-model="d.contact.mapEmbed" rows="3" @input="flash"></textarea>
              </field-wrap>
              <div class="map-preview">
                <iframe :src="d.contact.mapEmbed" width="100%" height="200" style="border:0;border-radius:8px;" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </template>

        <!-- ===== FOOTER ===== -->
        <template v-else-if="activeSection === 'footer'">
          <div class="editor-card">
            <div class="card-head">Логотип и бренд</div>
            <div class="card-body fields-grid">
              <field-wrap label="Логотип (основной)"><input v-model="d.footer.logoMain" @input="flash" /></field-wrap>
              <field-wrap label="Логотип (подпись)"><input v-model="d.footer.logoSub" @input="flash" /></field-wrap>
              <field-wrap label="Описание бренда"><textarea v-model="d.footer.brandDesc" rows="3" @input="flash"></textarea></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">Социальные сети</div>
            <div class="card-body fields-grid">
              <field-wrap label="Telegram (ссылка)"><input v-model="d.footer.socialTelegram" @input="flash" /></field-wrap>
              <field-wrap label="Instagram (ссылка)"><input v-model="d.footer.socialInstagram" @input="flash" /></field-wrap>
              <field-wrap label="Телефон (tel:+998...)"><input v-model="d.footer.socialPhone" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card" v-for="(col, ci) in d.footer.navCols" :key="ci">
            <div class="card-head">
              Навигационная колонка: {{ col.title }}
              <button class="btn-add" @click="col.links.push({ label: '', href: '#' }); flash()">+ Ссылка</button>
            </div>
            <div class="card-body">
              <field-wrap label="Название колонки" style="margin-bottom:12px"><input v-model="col.title" @input="flash" /></field-wrap>
              <div v-for="(link, li) in col.links" :key="li" class="row-item">
                <input v-model="link.label" placeholder="Текст" @input="flash" />
                <input v-model="link.href" placeholder="#section" @input="flash" />
                <button class="btn-del" @click="col.links.splice(li, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">Контакты в футере</div>
            <div class="card-body fields-grid">
              <field-wrap label="Адрес"><input v-model="d.footer.footerAddress" @input="flash" /></field-wrap>
              <field-wrap label="Телефон"><input v-model="d.footer.footerPhone" @input="flash" /></field-wrap>
              <field-wrap label="Email"><input v-model="d.footer.footerEmail" @input="flash" /></field-wrap>
              <field-wrap label="Часы работы"><input v-model="d.footer.footerHours" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">Нижняя строка</div>
            <div class="card-body fields-grid">
              <field-wrap label="Копирайт"><input v-model="d.footer.copyright" @input="flash" /></field-wrap>
              <field-wrap label="Политика конфиденциальности"><input v-model="d.footer.privacyLabel" @input="flash" /></field-wrap>
              <field-wrap label="Условия использования"><input v-model="d.footer.termsLabel" @input="flash" /></field-wrap>
            </div>
          </div>
        </template>

      </div><!-- /admin-content -->
    </main>
  </div><!-- /admin-shell -->

  <!-- Image Picker Modal -->
  <Transition name="modal-fade">
    <div v-if="picker.open" class="picker-backdrop" @click.self="picker.open = false">
      <div class="picker-modal">
        <div class="picker-header">
          <h3>Выберите фотографию</h3>
          <button @click="picker.open = false">✕</button>
        </div>
        <div class="picker-grid">
          <div
            v-for="src in availableImages"
            :key="src"
            class="picker-item"
            :class="{ selected: picker.target && picker.target.src === src }"
            @click="selectImage(src)"
          >
            <img :src="src" />
            <span>{{ src.split('/').pop() }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Reset Confirm Modal -->
  <Transition name="modal-fade">
    <div v-if="showResetConfirm" class="picker-backdrop" @click.self="showResetConfirm = false">
      <div class="confirm-modal">
        <h3>Сбросить все данные?</h3>
        <p>Все изменения будут удалены и данные вернутся к исходным значениям.</p>
        <div class="confirm-btns">
          <button class="btn-cancel" @click="showResetConfirm = false">Отмена</button>
          <button class="btn-confirm-reset" @click="doReset">Сбросить</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { siteData, iconPresets, availableImages, rotateImage, imgRotationStyle, resetToDefaults } from '../store/siteData.js'

const ADMIN_PASSWORD = 'admin44'
const auth = ref(!!sessionStorage.getItem('hojikent_admin'))
const pwdInput = ref('')
const showPwd = ref(false)
const loginError = ref(false)
const saved = ref(false)
const showResetConfirm = ref(false)
const activeSection = ref('hero')

const d = siteData

function doLogin() {
  if (pwdInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('hojikent_admin', '1')
    auth.value = true
    loginError.value = false
  } else {
    loginError.value = true
    setTimeout(() => { loginError.value = false }, 2000)
  }
}

function logout() {
  sessionStorage.removeItem('hojikent_admin')
  auth.value = false
}

function flash() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 1800)
}

function confirmReset() { showResetConfirm.value = true }
function doReset() {
  resetToDefaults()
  showResetConfirm.value = false
  flash()
}

function moveItem(arr, i, dir) {
  const j = i + dir
  if (j < 0 || j >= arr.length) return
  const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp
  flash()
}

// Image picker
const picker = reactive({ open: false, target: null })
function openPicker(target) {
  picker.target = target
  picker.open = true
}
function selectImage(src) {
  if (picker.target) picker.target.src = src
  picker.open = false
  flash()
}

const sections = [
  { id: 'hero',     label: 'Главная (Hero)',   icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>` },
  { id: 'about',    label: 'О пансионате',     icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` },
  { id: 'services', label: 'Услуги',           icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>` },
  { id: 'rooms',    label: 'Номера',           icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>` },
  { id: 'gallery',  label: 'Галерея',          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>` },
  { id: 'contact',  label: 'Контакты',        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>` },
  { id: 'footer',   label: 'Футер',            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>` },
]

const currentSectionLabel = computed(() => sections.find(s => s.id === activeSection.value)?.label || '')
</script>

<!-- FieldWrap inline component -->
<script>
export default {
  components: {
    FieldWrap: {
      props: ['label'],
      template: `<div class="field-wrap"><label class="field-label">{{ label }}</label><slot /></div>`
    }
  }
}
</script>

<style>
/* Admin global resets */
.admin-shell *, .login-page * { box-sizing: border-box; }
.admin-shell button { cursor: pointer; border: none; background: none; font-family: inherit; }
.admin-shell input, .admin-shell select, .admin-shell textarea { font-family: inherit; }
</style>

<style scoped>
/* ===== LOGIN ===== */
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex; align-items: center; justify-content: center;
}
.login-card {
  background: #fff; border-radius: 20px; padding: 48px;
  width: 100%; max-width: 420px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.4);
}
.login-logo {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 28px;
  font-size: 18px; font-weight: 700; color: #2d6a4f;
}
.login-card h2 { font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.login-card > p { font-size: 14px; color: #64748b; margin-bottom: 32px; }
.login-field { position: relative; margin-bottom: 12px; }
.login-field label { display: block; font-size: 12px; font-weight: 700; color: #64748b; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; }
.login-field input {
  width: 100%; padding: 13px 48px 13px 16px;
  border: 2px solid #e2e8f0; border-radius: 10px;
  font-size: 15px; color: #0f172a; outline: none;
  transition: border-color 0.2s;
}
.login-field input:focus { border-color: #2d6a4f; box-shadow: 0 0 0 3px rgba(45,106,79,0.12); }
.pwd-toggle {
  position: absolute; right: 14px; top: 50%;
  transform: translateY(8px); background: none; border: none;
  cursor: pointer; font-size: 16px;
}
.login-error { color: #ef4444; font-size: 13px; margin-bottom: 8px; }
.login-btn {
  width: 100%; padding: 14px;
  background: #2d6a4f; color: #fff;
  border-radius: 10px; font-size: 15px; font-weight: 700;
  cursor: pointer; border: none; margin-top: 8px;
  transition: background 0.2s, transform 0.1s;
}
.login-btn:hover { background: #1b4332; transform: translateY(-1px); }
.login-btn:active { transform: none; }

/* ===== SHELL ===== */
.admin-shell {
  display: flex; min-height: 100vh;
  background: #f1f5f9;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 240px; min-height: 100vh;
  background: #0f172a;
  display: flex; flex-direction: column;
  flex-shrink: 0;
  position: sticky; top: 0; height: 100vh;
  overflow-y: auto;
}
.sidebar__logo {
  display: flex; align-items: center; gap: 12px;
  padding: 24px 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.sidebar__logo-main { font-size: 14px; font-weight: 700; color: #fff; letter-spacing: 0.08em; }
.sidebar__logo-sub { font-size: 10px; color: #52b788; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }

.sidebar__nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 2px; }
.sidebar__item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 8px;
  font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.6);
  text-align: left; width: 100%;
  transition: background 0.15s, color 0.15s;
}
.sidebar__item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.9); }
.sidebar__item.active { background: rgba(82,183,136,0.18); color: #52b788; font-weight: 700; }
.sidebar__icon { flex-shrink: 0; opacity: 0.8; }

.sidebar__footer {
  padding: 16px 12px 24px;
  display: flex; flex-direction: column; gap: 4px;
  border-top: 1px solid rgba(255,255,255,0.07);
}
.sidebar__action {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 12px; border-radius: 8px;
  font-size: 12px; font-weight: 600;
  transition: background 0.15s;
  text-decoration: none;
}
.sidebar__action--view { color: #52b788; }
.sidebar__action--view:hover { background: rgba(82,183,136,0.15); }
.sidebar__action--reset { color: rgba(255,255,255,0.45); }
.sidebar__action--reset:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); }
.sidebar__action--logout { color: rgba(239,68,68,0.7); }
.sidebar__action--logout:hover { background: rgba(239,68,68,0.1); color: #ef4444; }

/* ===== MAIN ===== */
.admin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }

.admin-topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 32px; background: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky; top: 0; z-index: 100;
}
.admin-topbar h1 { font-size: 20px; font-weight: 700; color: #0f172a; }
.save-toast {
  background: #2d6a4f; color: #fff;
  padding: 6px 16px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
}

.admin-content {
  padding: 28px 32px;
  display: flex; flex-direction: column; gap: 20px;
  max-width: 900px;
}

/* ===== CARDS ===== */
.editor-card {
  background: #fff; border-radius: 14px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  border: 1px solid #e2e8f0; overflow: hidden;
}
.card-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-size: 13px; font-weight: 700; color: #475569;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.card-head-actions { display: flex; align-items: center; gap: 6px; }
.card-body { padding: 20px; }

.fields-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}

.field-wrap { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.06em; text-transform: uppercase; }
.field-wrap input, .field-wrap select, .field-wrap textarea {
  width: 100%; padding: 10px 12px;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; color: #1e293b; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field-wrap input:focus, .field-wrap select:focus, .field-wrap textarea:focus {
  border-color: #2d6a4f; box-shadow: 0 0 0 3px rgba(45,106,79,0.1);
}
.field-wrap textarea { resize: vertical; min-height: 72px; }

/* Row items */
.row-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}
.row-item:last-child { border-bottom: none; }
.row-item input { flex: 1; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; }
.row-item input:focus { border-color: #2d6a4f; }

/* Buttons */
.btn-add {
  background: #ecfdf5; color: #2d6a4f;
  border: 1.5px solid #bbf7d0; border-radius: 6px;
  padding: 5px 12px; font-size: 12px; font-weight: 700;
  cursor: pointer; transition: all 0.15s;
}
.btn-add:hover { background: #2d6a4f; color: #fff; border-color: #2d6a4f; }
.btn-add-card {
  background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px;
  padding: 14px; font-size: 13px; font-weight: 700; color: #64748b;
  width: 100%; cursor: pointer; transition: all 0.15s;
}
.btn-add-card:hover { border-color: #2d6a4f; color: #2d6a4f; background: #f0fdf4; }
.btn-del {
  background: #fee2e2; color: #ef4444; border: none;
  width: 28px; height: 28px; border-radius: 6px;
  font-size: 13px; cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.btn-del:hover { background: #ef4444; color: #fff; }
.btn-del-sm {
  background: #fee2e2; color: #ef4444; border: none;
  padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: background 0.15s;
}
.btn-del-sm:hover { background: #ef4444; color: #fff; }
.btn-icon {
  width: 28px; height: 28px; background: #f1f5f9; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: #475569; cursor: pointer;
  transition: background 0.15s;
}
.btn-icon:hover:not(:disabled) { background: #e2e8f0; }
.btn-icon:disabled { opacity: 0.35; cursor: not-allowed; }
.btn-cancel {
  padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;
  background: #f1f5f9; color: #475569; border: none; cursor: pointer;
}
.btn-confirm-reset {
  padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;
  background: #ef4444; color: #fff; border: none; cursor: pointer;
}

/* Image stuff */
.img-list { display: flex; flex-direction: column; gap: 12px; }
.img-row {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 12px; background: #f8fafc; border-radius: 10px;
  border: 1px solid #e2e8f0;
}
.img-thumb {
  width: 90px; height: 68px; border-radius: 8px; overflow: hidden;
  background: #e2e8f0; flex-shrink: 0; cursor: pointer; position: relative;
}
.img-thumb.lg { width: 160px; height: 120px; border-radius: 10px; }
.img-thumb img { width: 100%; height: 100%; object-fit: cover; }
.img-thumb-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.45);
  color: #fff; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.2s;
}
.img-thumb:hover .img-thumb-overlay { opacity: 1; }
.img-row-fields { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.img-row-fields input {
  padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 7px;
  font-size: 12px; outline: none;
}
.img-row-fields input:focus { border-color: #2d6a4f; }
.img-row-actions { display: flex; flex-direction: column; gap: 4px; }

.rotation-ctrl {
  display: flex; align-items: center; gap: 8px;
}
.rotation-ctrl button {
  background: #e2e8f0; border: none; border-radius: 6px;
  padding: 5px 10px; font-size: 12px; font-weight: 600; color: #475569;
  cursor: pointer; transition: all 0.15s;
}
.rotation-ctrl button:hover { background: #2d6a4f; color: #fff; }
.rotation-val { font-size: 12px; font-weight: 700; color: #2d6a4f; min-width: 36px; text-align: center; }

/* Gallery size radio */
.gallery-size-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.gallery-size-row label { font-size: 12px; color: #475569; display: flex; align-items: center; gap: 5px; cursor: pointer; }

/* Features */
.feature-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid #f1f5f9;
}
.feature-row:last-child { border-bottom: none; }
.feature-icon-pick { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.feature-icon-pick select { font-size: 10px; width: 90px; border: 1px solid #e2e8f0; border-radius: 4px; padding: 2px 4px; }
.icon-preview { width: 36px; height: 36px; background: rgba(45,106,79,0.12); color: #2d6a4f; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.icon-select-row { display: flex; align-items: center; gap: 8px; }
.icon-select-row select { flex: 1; padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 7px; font-size: 12px; }
.feature-row input { flex: 1; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; }
.feature-row input:focus { border-color: #2d6a4f; }

/* Service editor */
.service-editor { display: flex; gap: 18px; align-items: flex-start; }
.service-fields { flex: 1; display: flex; flex-direction: column; gap: 12px; }

/* Details/tags */
.details-editor { display: flex; flex-direction: column; gap: 6px; }
.tags-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 8px; border: 1.5px solid #e2e8f0; border-radius: 8px; min-height: 40px; }
.tag { display: flex; align-items: center; gap: 5px; background: #ecfdf5; color: #2d6a4f; border: 1px solid #bbf7d0; border-radius: 20px; padding: 4px 10px; font-size: 12px; font-weight: 600; }
.tag button { background: none; border: none; color: #2d6a4f; cursor: pointer; font-size: 14px; line-height: 1; }
.tag-input { border: none; outline: none; font-size: 12px; min-width: 80px; background: transparent; }

/* Map preview */
.map-preview { margin-top: 12px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }

/* Image picker modal */
.picker-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6);
  z-index: 9000; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.picker-modal {
  background: #fff; border-radius: 16px;
  width: 100%; max-width: 820px; max-height: 85vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.picker-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; border-bottom: 1px solid #e2e8f0;
}
.picker-header h3 { font-size: 16px; font-weight: 700; }
.picker-header button { background: none; border: none; font-size: 18px; cursor: pointer; color: #64748b; }
.picker-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;
  padding: 16px; overflow-y: auto;
}
.picker-item { cursor: pointer; border-radius: 8px; overflow: hidden; border: 2px solid transparent; transition: border-color 0.15s; }
.picker-item:hover { border-color: #2d6a4f; }
.picker-item.selected { border-color: #2d6a4f; outline: 3px solid rgba(45,106,79,0.3); }
.picker-item img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
.picker-item span { display: block; font-size: 10px; color: #64748b; text-align: center; padding: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Confirm modal */
.confirm-modal {
  background: #fff; border-radius: 16px; padding: 32px;
  max-width: 400px; width: 100%; text-align: center;
}
.confirm-modal h3 { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
.confirm-modal p { font-size: 14px; color: #64748b; margin-bottom: 28px; }
.confirm-btns { display: flex; gap: 12px; justify-content: center; }

/* Topbar toast transitions */
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateY(-8px); }
.toast-leave-to { opacity: 0; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .sidebar { width: 200px; }
  .admin-content { padding: 20px; }
  .fields-grid { grid-template-columns: 1fr; }
  .picker-grid { grid-template-columns: repeat(3, 1fr); }
  .service-editor { flex-direction: column; }
  .img-thumb.lg { width: 100%; height: 160px; }
}
</style>
