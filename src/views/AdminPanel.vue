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
      <div class="login-lang-toggle">
        <button :class="{ active: adminLang === 'ru' }" @click="setAdminLang('ru')">🇷🇺</button>
        <button :class="{ active: adminLang === 'uz' }" @click="setAdminLang('uz')">🇺🇿</button>
      </div>
      <h2>{{ ui.loginTitle }}</h2>
      <p>{{ ui.loginSub }}</p>
      <form @submit.prevent="doLogin">
        <div class="login-field">
          <label>{{ ui.loginPassword }}</label>
          <input
            :type="showPwd ? 'text' : 'password'"
            v-model="pwdInput"
            :placeholder="ui.loginPlaceholder"
            autofocus
          />
          <button type="button" class="pwd-toggle" @click="showPwd = !showPwd">
            {{ showPwd ? '🙈' : '👁' }}
          </button>
        </div>
        <div v-if="loginError" class="login-error">{{ ui.loginError }}</div>
        <button type="submit" class="login-btn">{{ ui.loginBtn }}</button>
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
        <div class="sidebar__lang">
          <button :class="{ active: adminLang === 'ru' }" @click="setAdminLang('ru')">🇷🇺</button>
          <button :class="{ active: adminLang === 'uz' }" @click="setAdminLang('uz')">🇺🇿</button>
        </div>
        <a href="/#/" target="_blank" class="sidebar__action sidebar__action--view">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          {{ ui.openSite }}
        </a>
        <button class="sidebar__action sidebar__action--reset" @click="confirmReset">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.61"/></svg>
          {{ ui.resetData }}
        </button>
        <button class="sidebar__action sidebar__action--logout" @click="logout">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          {{ ui.logout }}
        </button>
      </div>
    </aside>

    <!-- Content -->
    <main class="admin-main">
      <header class="admin-topbar">
        <h1>{{ currentSectionLabel }}</h1>
        <div class="topbar-right">
          <Transition name="toast">
            <div v-if="saved" class="save-toast">{{ ui.saved }}</div>
          </Transition>
        </div>
      </header>

      <div class="admin-content">

        <!-- ===== HERO ===== -->
        <template v-if="activeSection === 'hero'">
          <div class="editor-card">
            <div class="card-head">{{ ui.heroNav }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.navAbout"><input v-model="d.nav.about" @input="flash" /></field-wrap>
              <field-wrap :label="ui.navServices"><input v-model="d.nav.services" @input="flash" /></field-wrap>
              <field-wrap :label="ui.navGallery"><input v-model="d.nav.gallery" @input="flash" /></field-wrap>
              <field-wrap :label="ui.navContact"><input v-model="d.nav.contact" @input="flash" /></field-wrap>
              <field-wrap :label="ui.navBook"><input v-model="d.nav.book" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.heroText }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.heroBadge"><input v-model="d.hero.badge" @input="flash" /></field-wrap>
              <field-wrap :label="ui.heroTitle1"><input v-model="d.hero.title" @input="flash" /></field-wrap>
              <field-wrap :label="ui.heroTitleItalic"><input v-model="d.hero.titleItalic" @input="flash" /></field-wrap>
              <field-wrap :label="ui.heroSubtitle"><textarea v-model="d.hero.subtitle" rows="2" @input="flash"></textarea></field-wrap>
              <field-wrap :label="ui.heroBtnBook"><input v-model="d.hero.btnBook" @input="flash" /></field-wrap>
              <field-wrap :label="ui.heroBtnLearn"><input v-model="d.hero.btnLearn" @input="flash" /></field-wrap>
              <field-wrap :label="ui.heroScrollText"><input v-model="d.hero.scrollText" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              {{ ui.heroStats }}
              <button class="btn-add" @click="d.hero.stats.push({ value: '', label: '' }); flash()">{{ ui.add }}</button>
            </div>
            <div class="card-body">
              <div v-for="(stat, i) in d.hero.stats" :key="i" class="row-item">
                <input v-model="stat.value" :placeholder="ui.statValuePh" @input="flash" />
                <input v-model="stat.label" :placeholder="ui.statLabelPh" @input="flash" />
                <button class="btn-del" @click="d.hero.stats.splice(i, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              {{ ui.heroSlider }}
              <div style="display:flex;gap:6px">
                <button class="btn-upload" @click="triggerUpload(s => { d.hero.images.push({ src: s, rotation: 0 }); flash() })">{{ ui.uploadPhoto }}</button>
                <button class="btn-add" @click="d.hero.images.push({ src: '/images/', rotation: 0 }); flash()">{{ ui.add }}</button>
              </div>
            </div>
            <div class="card-body img-list">
              <draggable v-model="d.hero.images" item-key="src" :animation="150" handle=".drag-handle" @change="flash">
                <template #item="{ element: img, index: i }">
                  <div class="img-row">
                    <div class="drag-handle" title="Перетащить">⠿</div>
                    <div class="img-thumb" @click="openPicker(img)">
                      <img :src="img.src" :style="imgRotationStyle(img.rotation)" />
                      <div class="img-thumb-overlay">🖼 Выбрать</div>
                    </div>
                    <div class="img-row-fields">
                      <div class="upload-row">
                        <input v-model="img.src" placeholder="/images/..." @input="flash" />
                        <button class="btn-upload-inline" @click="triggerUpload(s => { img.src = s })">{{ ui.uploadFile }}</button>
                      </div>
                      <div class="rotation-ctrl">
                        <button @click="rotateImage(img, 'left'); flash()">{{ ui.rotateLeft }}</button>
                        <span class="rotation-val">{{ img.rotation }}°</span>
                        <button @click="rotateImage(img, 'right'); flash()">{{ ui.rotateRight }}</button>
                      </div>
                    </div>
                    <div class="img-row-actions">
                      <button class="btn-del" @click="d.hero.images.splice(i, 1); flash()">✕</button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </template>

        <!-- ===== ABOUT ===== -->
        <template v-else-if="activeSection === 'about'">
          <div class="editor-card">
            <div class="card-head">{{ ui.aboutTitles }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.aboutSectionLabel"><input v-model="d.about.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.aboutTitle"><textarea v-model="d.about.title" rows="2" @input="flash"></textarea></field-wrap>
              <field-wrap :label="ui.aboutBadgeNum"><input v-model="d.about.badgeNumber" @input="flash" /></field-wrap>
              <field-wrap :label="ui.aboutBadgeText"><input v-model="d.about.badgeText" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              {{ ui.aboutParagraphs }}
              <button class="btn-add" @click="d.about.paragraphs.push(''); flash()">{{ ui.add }}</button>
            </div>
            <div class="card-body para-list">
              <div v-for="(_, i) in d.about.paragraphs" :key="i" class="para-item">
                <span class="para-num">{{ i + 1 }}</span>
                <textarea v-model="d.about.paragraphs[i]" rows="3" @input="flash" class="para-textarea" :placeholder="`${ui.paraPlaceholder} ${i + 1}...`"></textarea>
                <button class="para-del" @click="d.about.paragraphs.splice(i, 1); flash()" title="Удалить">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              {{ ui.aboutFeatures }}
              <button class="btn-add" @click="d.about.features.push({ title: '', desc: '', iconKey: 'star' }); flash()">{{ ui.add }}</button>
            </div>
            <div class="card-body">
              <div v-for="(f, i) in d.about.features" :key="i" class="feature-row">
                <div class="feature-icon-pick">
                  <div class="icon-preview" v-html="iconPresets[f.iconKey] || ''"></div>
                  <select v-model="f.iconKey" @change="flash">
                    <option v-for="k in Object.keys(iconPresets)" :key="k" :value="k">{{ k }}</option>
                  </select>
                </div>
                <input v-model="f.title" :placeholder="ui.featureName" @input="flash" />
                <input v-model="f.desc" :placeholder="ui.featureDesc" @input="flash" />
                <button class="btn-del" @click="d.about.features.splice(i, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.aboutPhotos }}</div>
            <div class="card-body img-list">
              <draggable v-model="d.about.images" item-key="src" :animation="150" handle=".drag-handle" @change="flash">
                <template #item="{ element: img, index: i }">
                  <div class="img-row">
                    <div class="drag-handle" :title="ui.dragHandle">⠿</div>
                    <div class="img-thumb" @click="openPicker(img)">
                      <img :src="img.src" :style="imgRotationStyle(img.rotation)" />
                      <div class="img-thumb-overlay">🖼 Выбрать</div>
                    </div>
                    <div class="img-row-fields">
                      <label class="field-label">{{ i === 0 ? ui.photoMain : ui.photoSecondary }}</label>
                      <div class="upload-row">
                        <input v-model="img.src" @input="flash" />
                        <button class="btn-upload-inline" @click="triggerUpload(s => { img.src = s })">{{ ui.uploadFile }}</button>
                      </div>
                      <div class="rotation-ctrl">
                        <button @click="rotateImage(img, 'left'); flash()">{{ ui.rotateLeft }}</button>
                        <span class="rotation-val">{{ img.rotation }}°</span>
                        <button @click="rotateImage(img, 'right'); flash()">{{ ui.rotateRight }}</button>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </template>

        <!-- ===== VIDEO ===== -->
        <template v-else-if="activeSection === 'video'">
          <div class="editor-card">
            <div class="card-head">{{ ui.sections.video }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.videoSectionLabel"><input v-model="d.video.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.videoTitle"><input v-model="d.video.title" @input="flash" /></field-wrap>
              <field-wrap :label="ui.videoSubtitle"><input v-model="d.video.subtitle" @input="flash" /></field-wrap>
              <field-wrap :label="ui.videoUrl" style="grid-column: 1 / -1">
                <input v-model="d.video.youtubeUrl" :placeholder="ui.videoUrlPlaceholder" @input="flash" />
              </field-wrap>
            </div>
          </div>
        </template>

        <!-- ===== SERVICES ===== -->
        <template v-else-if="activeSection === 'services'">
          <div class="editor-card">
            <div class="card-head">{{ ui.sectionTitles }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.sectionLabel"><input v-model="d.services.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.sectionTitle"><input v-model="d.services.title" @input="flash" /></field-wrap>
              <field-wrap :label="ui.sectionSubtitle"><input v-model="d.services.subtitle" @input="flash" /></field-wrap>
              <field-wrap :label="ui.servicesNote"><input v-model="d.services.note" @input="flash" /></field-wrap>
            </div>
          </div>

          <draggable v-model="d.services.items" item-key="title" :animation="150" handle=".drag-handle" @change="flash">
            <template #item="{ element: svc, index: i }">
              <div class="editor-card">
                <div class="card-head">
                  <div class="drag-handle" :title="ui.dragHandle">⠿</div>
                  {{ ui.serviceCard }} {{ i + 1 }}: {{ svc.title || ui.serviceNoName }}
                  <div class="card-head-actions">
                    <button class="btn-del-sm" @click="d.services.items.splice(i, 1); flash()">{{ ui.delete }}</button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="service-editor">
                    <div class="img-thumb lg" @click="openPicker(svc, 'img')">
                      <img :src="svc.img" :style="imgRotationStyle(svc.rotation)" />
                      <div class="img-thumb-overlay">🖼 Выбрать</div>
                    </div>
                    <div class="service-fields">
                      <div class="fields-grid">
                        <field-wrap :label="ui.serviceTitle"><input v-model="svc.title" @input="flash" /></field-wrap>
                        <field-wrap :label="ui.serviceCta"><input v-model="svc.cta" @input="flash" /></field-wrap>
                        <field-wrap :label="ui.servicePrice"><input v-model="svc.price" @input="flash" /></field-wrap>
                        <field-wrap :label="ui.serviceUnit"><input v-model="svc.unit" @input="flash" /></field-wrap>
                        <field-wrap :label="ui.serviceIcon">
                          <div class="icon-select-row">
                            <div class="icon-preview" v-html="iconPresets[svc.iconKey] || ''"></div>
                            <select v-model="svc.iconKey" @change="flash">
                              <option v-for="k in Object.keys(iconPresets)" :key="k" :value="k">{{ k }}</option>
                            </select>
                          </div>
                        </field-wrap>
                      </div>
                      <field-wrap :label="ui.serviceDesc">
                        <textarea v-model="svc.desc" rows="3" @input="flash"></textarea>
                      </field-wrap>
                      <div class="upload-row">
                        <input v-model="svc.img" placeholder="/images/..." @input="flash" style="flex:1;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;outline:none" />
                        <button class="btn-upload-inline" @click="triggerUpload(s => { svc.img = s })">{{ ui.uploadFile }}</button>
                      </div>
                      <div class="rotation-ctrl">
                        <button @click="rotateImage(svc, 'left'); flash()">{{ ui.rotateLeft }}</button>
                        <span class="rotation-val">{{ svc.rotation }}°</span>
                        <button @click="rotateImage(svc, 'right'); flash()">{{ ui.rotateRight }}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
          <button class="btn-add-card" @click="d.services.items.push({ title: '', desc: '', img: '/images/', rotation: 0, price: '', unit: '', cta: 'Подробнее', iconKey: 'star' }); flash()">
            {{ ui.addService }}
          </button>
        </template>

        <!-- ===== ROOMS ===== -->
        <template v-else-if="activeSection === 'rooms'">
          <div class="editor-card">
            <div class="card-head">{{ ui.sectionTitles }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.sectionLabel"><input v-model="d.rooms.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.sectionTitle"><input v-model="d.rooms.title" @input="flash" /></field-wrap>
              <field-wrap :label="ui.sectionSubtitle"><input v-model="d.rooms.subtitle" @input="flash" /></field-wrap>
              <field-wrap :label="ui.roomsPricePrefix"><input v-model="d.rooms.pricePrefix" @input="flash" /></field-wrap>
              <field-wrap :label="ui.roomsPriceUnit"><input v-model="d.rooms.priceUnit" @input="flash" /></field-wrap>
              <field-wrap :label="ui.roomsViewText"><input v-model="d.rooms.viewText" @input="flash" /></field-wrap>
              <field-wrap :label="ui.roomsBookBtn"><input v-model="d.rooms.bookBtn" @input="flash" /></field-wrap>
              <field-wrap :label="ui.roomsBookBtnModal"><input v-model="d.rooms.bookBtnModal" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              {{ ui.roomsTabs }}
              <button class="btn-add" @click="d.rooms.tabs.push({ id: 'new', label: '' }); flash()">{{ ui.add }}</button>
            </div>
            <div class="card-body">
              <div v-for="(tab, i) in d.rooms.tabs" :key="i" class="row-item">
                <input v-model="tab.id" :placeholder="ui.tabIdPh" @input="flash" style="max-width:140px" />
                <input v-model="tab.label" :placeholder="ui.tabNamePh" @input="flash" />
                <button class="btn-del" @click="d.rooms.tabs.splice(i, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <draggable v-model="d.rooms.items" item-key="name" :animation="150" handle=".drag-handle" @change="flash">
            <template #item="{ element: room, index: i }">
              <div class="editor-card">
                <div class="card-head">
                  <div class="drag-handle" :title="ui.dragHandle">⠿</div>
                  {{ room.name || `${ui.roomCard} ${i + 1}` }}
                  <div class="card-head-actions">
                    <button class="btn-del-sm" @click="d.rooms.items.splice(i, 1); flash()">{{ ui.delete }}</button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="service-editor">
                    <div class="img-thumb lg" @click="openPicker(room, 'img')">
                      <img :src="room.img" :style="imgRotationStyle(room.rotation)" />
                      <div class="img-thumb-overlay">🖼 Выбрать</div>
                    </div>
                    <div class="service-fields">
                      <div class="fields-grid">
                        <field-wrap :label="ui.roomName"><input v-model="room.name" @input="flash" /></field-wrap>
                        <field-wrap :label="ui.roomType">
                          <select v-model="room.type" @change="flash">
                            <option v-for="tab in d.rooms.tabs.filter(t => t.id !== 'all')" :key="tab.id" :value="tab.id">{{ tab.label }}</option>
                          </select>
                        </field-wrap>
                        <field-wrap :label="ui.roomPrice"><input v-model="room.price" @input="flash" /></field-wrap>
                        <div class="field-wrap-plain">
                          <label class="plain-label">{{ ui.roomPhoto }}</label>
                          <div class="upload-row">
                            <input v-model="room.img" placeholder="/images/..." @input="flash" style="flex:1;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;outline:none" />
                            <button class="btn-upload-inline" @click="triggerUpload(s => { room.img = s })">{{ ui.uploadFile }}</button>
                          </div>
                        </div>
                      </div>
                      <field-wrap :label="ui.roomDesc">
                        <textarea v-model="room.desc" rows="3" @input="flash"></textarea>
                      </field-wrap>
                      <div class="rotation-ctrl" style="margin-bottom:12px">
                        <button @click="rotateImage(room, 'left'); flash()">{{ ui.rotateLeft }}</button>
                        <span class="rotation-val">{{ room.rotation }}°</span>
                        <button @click="rotateImage(room, 'right'); flash()">{{ ui.rotateRight }}</button>
                      </div>
                      <div class="details-editor">
                        <label class="field-label">{{ ui.roomDetails }}</label>
                        <div class="tags-row">
                          <span v-for="(det, di) in room.details" :key="di" class="tag">
                            {{ det }}
                            <button @click="room.details.splice(di, 1); flash()">×</button>
                          </span>
                          <input
                            class="tag-input"
                            :placeholder="ui.addTagPh"
                            @keydown.enter.prevent="e => { if(e.target.value.trim()) { room.details.push(e.target.value.trim()); e.target.value = ''; flash() } }"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
          <button class="btn-add-card" @click="d.rooms.items.push({ img: '/images/', rotation: 0, name: '', type: d.rooms.tabs[1]?.id || 'standard', price: '', desc: '', details: [] }); flash()">
            {{ ui.addRoom }}
          </button>
        </template>

        <!-- ===== GALLERY ===== -->
        <template v-else-if="activeSection === 'gallery'">
          <div class="editor-card">
            <div class="card-head">{{ ui.sectionTitles }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.sectionLabel"><input v-model="d.gallery.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.sectionTitle"><input v-model="d.gallery.title" @input="flash" /></field-wrap>
              <field-wrap :label="ui.galleryShowAllBtn"><input v-model="d.gallery.showAllBtn" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              {{ ui.galleryPhotos }} ({{ d.gallery.images.length }})
              <div style="display:flex;gap:6px">
                <button class="btn-upload" @click="triggerUpload(s => { d.gallery.images.push({ src: s, alt: '', size: '', rotation: 0 }); flash() })">{{ ui.uploadBtn }}</button>
                <button class="btn-add" @click="d.gallery.images.push({ src: '/images/', alt: '', size: '', rotation: 0 }); flash()">{{ ui.add }}</button>
              </div>
            </div>
            <div class="card-body img-list">
              <draggable v-model="d.gallery.images" item-key="src" :animation="150" handle=".drag-handle" @change="flash">
                <template #item="{ element: img, index: i }">
                  <div class="img-row">
                    <div class="drag-handle" :title="ui.dragHandle">⠿</div>
                    <div class="img-thumb" @click="openPicker(img)">
                      <img :src="img.src" :style="imgRotationStyle(img.rotation)" />
                      <div class="img-thumb-overlay">🖼 Выбрать</div>
                    </div>
                    <div class="img-row-fields">
                      <div class="upload-row">
                        <input v-model="img.src" placeholder="/images/..." @input="flash" />
                        <button class="btn-upload-inline" @click="triggerUpload(s => { img.src = s })">{{ ui.uploadFile }}</button>
                      </div>
                      <input v-model="img.alt" :placeholder="ui.galleryAltPh" @input="flash" />
                      <div class="gallery-size-row">
                        <label class="field-label">{{ ui.gallerySize }}</label>
                        <label><input type="radio" v-model="img.size" value="" @change="flash" /> {{ ui.gallerySizeNormal }}</label>
                        <label><input type="radio" v-model="img.size" value="wide" @change="flash" /> {{ ui.gallerySizeWide }}</label>
                        <label><input type="radio" v-model="img.size" value="tall" @change="flash" /> {{ ui.gallerySizeTall }}</label>
                      </div>
                      <div class="rotation-ctrl">
                        <button @click="rotateImage(img, 'left'); flash()">{{ ui.rotateLeft }}</button>
                        <span class="rotation-val">{{ img.rotation }}°</span>
                        <button @click="rotateImage(img, 'right'); flash()">{{ ui.rotateRight }}</button>
                      </div>
                    </div>
                    <div class="img-row-actions">
                      <button class="btn-del" @click="d.gallery.images.splice(i, 1); flash()">✕</button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </template>

        <!-- ===== CONTACT ===== -->
        <template v-else-if="activeSection === 'contact'">
          <div class="editor-card">
            <div class="card-head">{{ ui.contactTitles }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.sectionLabel"><input v-model="d.contact.sectionLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.sectionTitle"><input v-model="d.contact.title" @input="flash" /></field-wrap>
              <field-wrap :label="ui.contactFormTitle"><input v-model="d.contact.formTitle" @input="flash" /></field-wrap>
              <field-wrap :label="ui.contactFormSubtitle"><input v-model="d.contact.formSubtitle" @input="flash" /></field-wrap>
              <field-wrap :label="ui.contactSuccessMsg"><input v-model="d.contact.successMessage" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.contactInfo }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.contactAddress"><textarea v-model="d.contact.address" rows="2" @input="flash"></textarea></field-wrap>
              <field-wrap :label="ui.contactPhone"><input v-model="d.contact.phone" @input="flash" /></field-wrap>
              <field-wrap :label="ui.contactEmail"><input v-model="d.contact.email" @input="flash" /></field-wrap>
              <field-wrap :label="ui.contactHours"><input v-model="d.contact.hours" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.contactFormFields }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.fNameLabel"><input v-model="d.contact.nameLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fNamePh"><input v-model="d.contact.namePlaceholder" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fPhoneLabel"><input v-model="d.contact.phoneLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fPhonePh"><input v-model="d.contact.phonePlaceholder" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fCheckin"><input v-model="d.contact.checkinLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fCheckout"><input v-model="d.contact.checkoutLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fGuestsLabel"><input v-model="d.contact.guestsLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fGuestsPh"><input v-model="d.contact.guestsPlaceholder" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fRoomTypeLabel"><input v-model="d.contact.roomTypeLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fRoomTypeAny"><input v-model="d.contact.roomTypeAny" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fMsgLabel"><input v-model="d.contact.messageLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fMsgPh"><input v-model="d.contact.messagePlaceholder" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fSubmitBtn"><input v-model="d.contact.submitBtn" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fSubmittingBtn"><input v-model="d.contact.submittingBtn" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fRoomStandard"><input v-model="d.contact.roomStandard" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fRoomDouble"><input v-model="d.contact.roomDouble" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fRoomSuite"><input v-model="d.contact.roomSuite" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fLabelAddress"><input v-model="d.contact.labelAddress" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fLabelPhone"><input v-model="d.contact.labelPhone" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fLabelEmail"><input v-model="d.contact.labelEmail" @input="flash" /></field-wrap>
              <field-wrap :label="ui.fLabelHours"><input v-model="d.contact.labelHours" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.contactMap }}</div>
            <div class="card-body">
              <field-wrap :label="ui.contactMapLabel">
                <textarea v-model="d.contact.mapEmbed" rows="3" @input="flash"></textarea>
              </field-wrap>
              <div class="map-preview">
                <iframe :src="d.contact.mapEmbed" width="100%" height="200" style="border:0;border-radius:8px;" loading="lazy"></iframe>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="color:#229ED9"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram — уведомления о бронях
            </div>
            <div class="card-body fields-grid">
              <field-wrap label="Bot Token">
                <input v-model="d.contact.telegramToken" @input="flash" placeholder="123456789:AAH..." style="font-family:monospace;font-size:12px" />
              </field-wrap>
              <field-wrap label="Chat ID">
                <input v-model="d.contact.telegramChatId" @input="flash" placeholder="-100..." style="font-family:monospace;font-size:12px" />
              </field-wrap>
            </div>
          </div>
        </template>

        <!-- ===== FOOTER ===== -->
        <template v-else-if="activeSection === 'footer'">
          <div class="editor-card">
            <div class="card-head">{{ ui.footerBrand }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.footerLogoMain"><input v-model="d.footer.logoMain" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerLogoSub"><input v-model="d.footer.logoSub" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerBrandDesc"><textarea v-model="d.footer.brandDesc" rows="3" @input="flash"></textarea></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.footerSocial }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.footerTelegram"><input v-model="d.footer.socialTelegram" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerInstagram"><input v-model="d.footer.socialInstagram" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerPhone"><input v-model="d.footer.socialPhone" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card" v-for="(col, ci) in d.footer.navCols" :key="ci">
            <div class="card-head">
              {{ ui.footerNavCol }} {{ col.title }}
              <button class="btn-add" @click="col.links.push({ label: '', href: '#' }); flash()">{{ ui.footerAddLink }}</button>
            </div>
            <div class="card-body">
              <field-wrap :label="ui.footerNavColName" style="margin-bottom:12px"><input v-model="col.title" @input="flash" /></field-wrap>
              <div v-for="(link, li) in col.links" :key="li" class="row-item">
                <input v-model="link.label" :placeholder="ui.footerLinkText" @input="flash" />
                <input v-model="link.href" placeholder="#section" @input="flash" />
                <button class="btn-del" @click="col.links.splice(li, 1); flash()">✕</button>
              </div>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.footerContacts }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.footerContactTitle"><input v-model="d.footer.footerContactTitle" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerAddress"><input v-model="d.footer.footerAddress" @input="flash" /></field-wrap>
              <field-wrap :label="ui.contactPhone"><input v-model="d.footer.footerPhone" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerEmail"><input v-model="d.footer.footerEmail" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerHours"><input v-model="d.footer.footerHours" @input="flash" /></field-wrap>
            </div>
          </div>

          <div class="editor-card">
            <div class="card-head">{{ ui.footerBottom }}</div>
            <div class="card-body fields-grid">
              <field-wrap :label="ui.footerCopyright"><input v-model="d.footer.copyright" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerPrivacy"><input v-model="d.footer.privacyLabel" @input="flash" /></field-wrap>
              <field-wrap :label="ui.footerTerms"><input v-model="d.footer.termsLabel" @input="flash" /></field-wrap>
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
          <h3>{{ ui.pickerTitle }}</h3>
          <div style="display:flex;gap:10px;align-items:center">
            <button class="btn-picker-upload" @click="triggerUpload(s => selectImage(s))">{{ ui.uploadNew }}</button>
            <button @click="picker.open = false">✕</button>
          </div>
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
        <h3>{{ ui.resetTitle }}</h3>
        <p>{{ ui.resetDesc }}</p>
        <div class="confirm-btns">
          <button class="btn-cancel" @click="showResetConfirm = false">{{ ui.resetCancel }}</button>
          <button class="btn-confirm-reset" @click="doReset">{{ ui.resetConfirm }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { siteData, iconPresets, availableImages, rotateImage, imgRotationStyle, resetToDefaults } from '../store/siteData.js'
import FieldWrap from '../components/FieldWrap.vue'
import draggable from 'vuedraggable'
import adminUiDict from '../i18n/adminUi.js'

const adminLang = ref(localStorage.getItem('hojikent_admin_lang') || 'ru')
function setAdminLang(l) { adminLang.value = l; localStorage.setItem('hojikent_admin_lang', l) }
const ui = computed(() => adminUiDict[adminLang.value])

const PWD_HASH = 'd60b03ffd0c5dc528cc4331e2dca677f014772590e474bb634ff74381af46de8'
const SESSION_KEY = 'hojikent_admin_v2'
const SESSION_TTL = 8 * 60 * 60 * 1000 // 8 hours

function checkSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return false
    const { ts } = JSON.parse(raw)
    return Date.now() - ts < SESSION_TTL
  } catch { return false }
}

const auth = ref(checkSession())
const pwdInput = ref('')
const showPwd = ref(false)
const loginError = ref(false)
const saved = ref(false)
const showResetConfirm = ref(false)
const activeSection = ref('hero')

const d = siteData

async function hashStr(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function doLogin() {
  const hash = await hashStr(pwdInput.value)
  if (hash === PWD_HASH) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() }))
    auth.value = true
    loginError.value = false
  } else {
    loginError.value = true
    setTimeout(() => { loginError.value = false }, 2000)
  }
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY)
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

// Image picker
const picker = reactive({ open: false, target: null, prop: 'src' })
function openPicker(target, prop = 'src') {
  picker.target = target
  picker.prop = prop
  picker.open = true
}
function selectImage(src) {
  if (picker.target) picker.target[picker.prop] = src
  picker.open = false
  flash()
}

// File upload
function triggerUpload(callback) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.style.cssText = 'position:fixed;top:-200px;left:-200px;opacity:0;pointer-events:none'
  document.body.appendChild(input)
  const cleanup = () => { try { document.body.removeChild(input) } catch {} }
  input.addEventListener('change', (e) => {
    cleanup()
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      callback(ev.target.result)
      flash()
    }
    reader.readAsDataURL(file)
  })
  input.addEventListener('cancel', cleanup)
  input.click()
}

const sectionIcons = {
  hero:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>`,
  about:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  video:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  services: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  rooms:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
  gallery:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  contact:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>`,
  footer:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
}
const sections = computed(() => Object.keys(sectionIcons).map(id => ({
  id, icon: sectionIcons[id], label: ui.value.sections[id],
})))

const currentSectionLabel = computed(() => sections.value.find(s => s.id === activeSection.value)?.label || '')
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
.sidebar__lang {
  display: flex; gap: 6px; padding: 4px 0 8px;
}
.sidebar__lang button {
  flex: 1; padding: 5px 4px; font-size: 16px; border-radius: 8px;
  background: rgba(255,255,255,0.1);
  border: 1.5px solid rgba(255,255,255,0.15);
  cursor: pointer; transition: all 0.2s;
  color: rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: center;
}
.sidebar__lang button.active {
  background: #52b788;
  border-color: #52b788;
  color: #fff;
  box-shadow: 0 2px 8px rgba(82,183,136,0.4);
}
.sidebar__lang button:hover:not(.active) {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.85);
}
.login-lang-toggle {
  display: flex; gap: 6px; justify-content: flex-end; margin-bottom: 16px;
}
.login-lang-toggle button {
  padding: 4px 10px; font-size: 16px; border-radius: 8px;
  background: #f1f5f9; border: 1.5px solid #e2e8f0; cursor: pointer;
  transition: background 0.15s;
}
.login-lang-toggle button.active { background: #2d6a4f; border-color: #2d6a4f; }
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

/* Paragraphs */
.para-list { display: flex; flex-direction: column; gap: 10px; }
.para-item {
  display: flex; align-items: flex-start; gap: 10px;
  background: #f8fafc; border: 1.5px solid #e2e8f0;
  border-radius: 10px; padding: 12px 14px;
  transition: border-color 0.2s;
}
.para-item:focus-within { border-color: #2d6a4f; }
.para-num {
  flex-shrink: 0; width: 24px; height: 24px; margin-top: 2px;
  background: #2d6a4f; color: #fff;
  border-radius: 50%; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.para-textarea {
  flex: 1; border: none; background: transparent; outline: none;
  font-size: 13px; color: #1e293b; resize: vertical;
  min-height: 64px; font-family: inherit; line-height: 1.6;
}
.para-del {
  flex-shrink: 0; width: 26px; height: 26px; margin-top: 1px;
  background: #fee2e2; color: #dc2626; border: none;
  border-radius: 6px; font-size: 13px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.para-del:hover { background: #fecaca; }

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
.btn-upload {
  background: #eff6ff; color: #3b82f6;
  border: 1.5px solid #bfdbfe; border-radius: 6px;
  padding: 5px 12px; font-size: 12px; font-weight: 700;
  cursor: pointer; transition: all 0.15s;
}
.btn-upload:hover { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.btn-picker-upload {
  background: #eff6ff; color: #3b82f6;
  border: 1.5px solid #bfdbfe; border-radius: 6px;
  padding: 6px 14px; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.15s;
}
.btn-picker-upload:hover { background: #3b82f6; color: #fff; border-color: #3b82f6; }
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
  font-size: 12px; outline: none; flex: 1;
}
.img-row-fields input:focus { border-color: #2d6a4f; }
.img-row-actions { display: flex; flex-direction: column; gap: 4px; }
.drag-handle {
  cursor: grab; font-size: 20px; color: #94a3b8;
  padding: 0 6px; user-select: none; line-height: 1;
  flex-shrink: 0;
}
.drag-handle:active { cursor: grabbing; color: #2d6a4f; }

.upload-row { display: flex; gap: 6px; align-items: center; }
.upload-row input { flex: 1; padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 7px; font-size: 12px; outline: none; }
.upload-row input:focus { border-color: #2d6a4f; }
.btn-upload-inline {
  flex-shrink: 0;
  background: #3b82f6; color: #fff;
  border: none; border-radius: 7px;
  padding: 8px 12px; font-size: 12px; font-weight: 700;
  cursor: pointer; white-space: nowrap;
  transition: background 0.15s;
}
.btn-upload-inline:hover { background: #2563eb; }
.field-wrap-plain { display: flex; flex-direction: column; gap: 6px; }
.plain-label { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.06em; text-transform: uppercase; }

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
