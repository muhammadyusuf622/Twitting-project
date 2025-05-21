# Blog API

## Loyha:
- Blog API uchun blog - coment yozish like bosih.

## Funkseonlay Talablar:
- User Yaratish.
- User Kirithish.
- User uchun blog qoshih.
- Blog ochirish va ozrgartirish.
- Blog uchun comment va like bosish
- Blog comment ochirish va ozgartirish
- Like ochirish.
- Home bolishi kerak.
- video qushish
- Foydalanuvchi o'zining oynasi bolishi kerak.
- Yangi blog qo'shish uchun oyna bolishi kerak.


## Talablar:
- Tezlik.
- Hafsizlik.
- Yangilash.

## Malumot:
1. Foydalanuvchilar(Users):
    - id
    - name
    - email (UNIQUE)
    - fon_number
    - created_at
2. Bloglar:
    - id
    - user_id (FK)
    - title
    - content
    - create_at
    - update_at
3. Commenlar:
    - id
    - blog_id (FK)
    - content
    - user_id (FK)
    - update_at
4. Liklar:
    - blog_id (FK)
    - user_id (FK)|
