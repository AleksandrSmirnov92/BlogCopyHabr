PGDMP     7            
        {            users    15.1    15.1 @    C           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            D           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            E           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            F           1262    16398    users    DATABASE     y   CREATE DATABASE users WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE users;
                postgres    false            �            1259    16697 
   about_user    TABLE     �  CREATE TABLE public.about_user (
    id_about_user bigint NOT NULL,
    img character varying(100),
    fullname character varying(50),
    lastname character varying(50),
    contacts character varying(50),
    linktocontacts character varying(200),
    briefly_about_yourself character varying(500),
    informattion_about_user character varying(1000),
    country character varying(100),
    region character varying(500),
    town character varying(100),
    user_id_from_users bigint
);
    DROP TABLE public.about_user;
       public         heap    postgres    false            �            1259    16696    about_user_id_about_user_seq    SEQUENCE     �   CREATE SEQUENCE public.about_user_id_about_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.about_user_id_about_user_seq;
       public          postgres    false    225            G           0    0    about_user_id_about_user_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.about_user_id_about_user_seq OWNED BY public.about_user.id_about_user;
          public          postgres    false    224            �            1259    16711    answers    TABLE     �   CREATE TABLE public.answers (
    answer_id bigint NOT NULL,
    question_id_from_questions bigint,
    user_id_from_users bigint,
    answers character varying(2000),
    responce_userid bigint
);
    DROP TABLE public.answers;
       public         heap    postgres    false            �            1259    16710    answers_answer_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.answers_answer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.answers_answer_id_seq;
       public          postgres    false    227            H           0    0    answers_answer_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.answers_answer_id_seq OWNED BY public.answers.answer_id;
          public          postgres    false    226            �            1259    16685 	   followers    TABLE       CREATE TABLE public.followers (
    followers_id bigint NOT NULL,
    followers_id_from_users bigint,
    javascript boolean NOT NULL,
    html boolean NOT NULL,
    css boolean NOT NULL,
    react boolean NOT NULL,
    vue boolean NOT NULL,
    git boolean NOT NULL
);
    DROP TABLE public.followers;
       public         heap    postgres    false            �            1259    16684    followers_followers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.followers_followers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.followers_followers_id_seq;
       public          postgres    false    223            I           0    0    followers_followers_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.followers_followers_id_seq OWNED BY public.followers.followers_id;
          public          postgres    false    222            �            1259    16625    question_and_tags    TABLE     �   CREATE TABLE public.question_and_tags (
    id_questions_and_tags bigint NOT NULL,
    user_id_from_users bigint,
    tag_id_from_tags bigint
);
 %   DROP TABLE public.question_and_tags;
       public         heap    postgres    false            �            1259    16624 +   question_and_tags_id_questions_and_tags_seq    SEQUENCE     �   CREATE SEQUENCE public.question_and_tags_id_questions_and_tags_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public.question_and_tags_id_questions_and_tags_seq;
       public          postgres    false    221            J           0    0 +   question_and_tags_id_questions_and_tags_seq    SEQUENCE OWNED BY     {   ALTER SEQUENCE public.question_and_tags_id_questions_and_tags_seq OWNED BY public.question_and_tags.id_questions_and_tags;
          public          postgres    false    220            �            1259    16606 	   questions    TABLE     �   CREATE TABLE public.questions (
    questions_id bigint NOT NULL,
    user_id bigint,
    question_title character varying(100),
    question_tags bigint,
    question_details character varying(5000),
    date_of_creation timestamp without time zone
);
    DROP TABLE public.questions;
       public         heap    postgres    false            �            1259    16605    questions_questions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.questions_questions_id_seq;
       public          postgres    false    219            K           0    0    questions_questions_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.questions_questions_id_seq OWNED BY public.questions.questions_id;
          public          postgres    false    218            �            1259    16566    tags    TABLE     �   CREATE TABLE public.tags (
    tags_id bigint NOT NULL,
    name_tag character varying(50),
    img_tag text,
    description text
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    16565    tags_tags_id_seq    SEQUENCE     y   CREATE SEQUENCE public.tags_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.tags_tags_id_seq;
       public          postgres    false    217            L           0    0    tags_tags_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.tags_tags_id_seq OWNED BY public.tags.tags_id;
          public          postgres    false    216            �            1259    16527    users    TABLE     �   CREATE TABLE public.users (
    user_id bigint NOT NULL,
    email character varying(50) NOT NULL,
    nickname character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16526    users_user_id_seq    SEQUENCE     z   CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    215            M           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    214            �           2604    16700    about_user id_about_user    DEFAULT     �   ALTER TABLE ONLY public.about_user ALTER COLUMN id_about_user SET DEFAULT nextval('public.about_user_id_about_user_seq'::regclass);
 G   ALTER TABLE public.about_user ALTER COLUMN id_about_user DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    16714    answers answer_id    DEFAULT     v   ALTER TABLE ONLY public.answers ALTER COLUMN answer_id SET DEFAULT nextval('public.answers_answer_id_seq'::regclass);
 @   ALTER TABLE public.answers ALTER COLUMN answer_id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    16688    followers followers_id    DEFAULT     �   ALTER TABLE ONLY public.followers ALTER COLUMN followers_id SET DEFAULT nextval('public.followers_followers_id_seq'::regclass);
 E   ALTER TABLE public.followers ALTER COLUMN followers_id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    16628 '   question_and_tags id_questions_and_tags    DEFAULT     �   ALTER TABLE ONLY public.question_and_tags ALTER COLUMN id_questions_and_tags SET DEFAULT nextval('public.question_and_tags_id_questions_and_tags_seq'::regclass);
 V   ALTER TABLE public.question_and_tags ALTER COLUMN id_questions_and_tags DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    16609    questions questions_id    DEFAULT     �   ALTER TABLE ONLY public.questions ALTER COLUMN questions_id SET DEFAULT nextval('public.questions_questions_id_seq'::regclass);
 E   ALTER TABLE public.questions ALTER COLUMN questions_id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16569    tags tags_id    DEFAULT     l   ALTER TABLE ONLY public.tags ALTER COLUMN tags_id SET DEFAULT nextval('public.tags_tags_id_seq'::regclass);
 ;   ALTER TABLE public.tags ALTER COLUMN tags_id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    16530    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    215    214    215            >          0    16697 
   about_user 
   TABLE DATA           �   COPY public.about_user (id_about_user, img, fullname, lastname, contacts, linktocontacts, briefly_about_yourself, informattion_about_user, country, region, town, user_id_from_users) FROM stdin;
    public          postgres    false    225   aP       @          0    16711    answers 
   TABLE DATA           v   COPY public.answers (answer_id, question_id_from_questions, user_id_from_users, answers, responce_userid) FROM stdin;
    public          postgres    false    227   �Q       <          0    16685 	   followers 
   TABLE DATA           r   COPY public.followers (followers_id, followers_id_from_users, javascript, html, css, react, vue, git) FROM stdin;
    public          postgres    false    223   ZR       :          0    16625    question_and_tags 
   TABLE DATA           h   COPY public.question_and_tags (id_questions_and_tags, user_id_from_users, tag_id_from_tags) FROM stdin;
    public          postgres    false    221   �R       8          0    16606 	   questions 
   TABLE DATA           }   COPY public.questions (questions_id, user_id, question_title, question_tags, question_details, date_of_creation) FROM stdin;
    public          postgres    false    219   �R       6          0    16566    tags 
   TABLE DATA           G   COPY public.tags (tags_id, name_tag, img_tag, description) FROM stdin;
    public          postgres    false    217   fS       4          0    16527    users 
   TABLE DATA           C   COPY public.users (user_id, email, nickname, password) FROM stdin;
    public          postgres    false    215   �W       N           0    0    about_user_id_about_user_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.about_user_id_about_user_seq', 7, true);
          public          postgres    false    224            O           0    0    answers_answer_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.answers_answer_id_seq', 30, true);
          public          postgres    false    226            P           0    0    followers_followers_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.followers_followers_id_seq', 6, true);
          public          postgres    false    222            Q           0    0 +   question_and_tags_id_questions_and_tags_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public.question_and_tags_id_questions_and_tags_seq', 19, true);
          public          postgres    false    220            R           0    0    questions_questions_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.questions_questions_id_seq', 35, true);
          public          postgres    false    218            S           0    0    tags_tags_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tags_tags_id_seq', 16, true);
          public          postgres    false    216            T           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 73, true);
          public          postgres    false    214            �           2606    16704    about_user about_user_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.about_user
    ADD CONSTRAINT about_user_pkey PRIMARY KEY (id_about_user);
 D   ALTER TABLE ONLY public.about_user DROP CONSTRAINT about_user_pkey;
       public            postgres    false    225            �           2606    16746 ,   about_user about_user_user_id_from_users_key 
   CONSTRAINT     u   ALTER TABLE ONLY public.about_user
    ADD CONSTRAINT about_user_user_id_from_users_key UNIQUE (user_id_from_users);
 V   ALTER TABLE ONLY public.about_user DROP CONSTRAINT about_user_user_id_from_users_key;
       public            postgres    false    225            �           2606    16718    answers answers_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (answer_id);
 >   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_pkey;
       public            postgres    false    227            �           2606    16690    followers followers_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (followers_id);
 B   ALTER TABLE ONLY public.followers DROP CONSTRAINT followers_pkey;
       public            postgres    false    223            �           2606    16630 (   question_and_tags question_and_tags_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.question_and_tags
    ADD CONSTRAINT question_and_tags_pkey PRIMARY KEY (id_questions_and_tags);
 R   ALTER TABLE ONLY public.question_and_tags DROP CONSTRAINT question_and_tags_pkey;
       public            postgres    false    221            �           2606    16613    questions questions_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (questions_id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public            postgres    false    219            �           2606    16571    tags tags_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tags_id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    217            �           2606    16534    users unique_email_address 
   CONSTRAINT     V   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email_address UNIQUE (email);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_email_address;
       public            postgres    false    215            �           2606    16532    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    16747 -   about_user about_user_user_id_from_users_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.about_user
    ADD CONSTRAINT about_user_user_id_from_users_fkey FOREIGN KEY (user_id_from_users) REFERENCES public.users(user_id);
 W   ALTER TABLE ONLY public.about_user DROP CONSTRAINT about_user_user_id_from_users_fkey;
       public          postgres    false    215    225    3213            �           2606    16719 /   answers answers_question_id_from_questions_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_from_questions_fkey FOREIGN KEY (question_id_from_questions) REFERENCES public.questions(questions_id);
 Y   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_question_id_from_questions_fkey;
       public          postgres    false    219    3217    227            �           2606    16757 $   answers answers_responce_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_responce_userid_fkey FOREIGN KEY (responce_userid) REFERENCES public.about_user(user_id_from_users);
 N   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_responce_userid_fkey;
       public          postgres    false    225    227    3225            �           2606    16724 '   answers answers_user_id_from_users_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_user_id_from_users_fkey FOREIGN KEY (user_id_from_users) REFERENCES public.users(user_id);
 Q   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_user_id_from_users_fkey;
       public          postgres    false    3213    227    215            �           2606    16691 0   followers followers_followers_id_from_users_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_followers_id_from_users_fkey FOREIGN KEY (followers_id_from_users) REFERENCES public.users(user_id);
 Z   ALTER TABLE ONLY public.followers DROP CONSTRAINT followers_followers_id_from_users_fkey;
       public          postgres    false    215    3213    223            �           2606    16636 9   question_and_tags question_and_tags_tag_id_from_tags_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.question_and_tags
    ADD CONSTRAINT question_and_tags_tag_id_from_tags_fkey FOREIGN KEY (tag_id_from_tags) REFERENCES public.tags(tags_id);
 c   ALTER TABLE ONLY public.question_and_tags DROP CONSTRAINT question_and_tags_tag_id_from_tags_fkey;
       public          postgres    false    217    3215    221            �           2606    16631 ;   question_and_tags question_and_tags_user_id_from_users_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.question_and_tags
    ADD CONSTRAINT question_and_tags_user_id_from_users_fkey FOREIGN KEY (user_id_from_users) REFERENCES public.users(user_id);
 e   ALTER TABLE ONLY public.question_and_tags DROP CONSTRAINT question_and_tags_user_id_from_users_fkey;
       public          postgres    false    3213    221    215            �           2606    16619 &   questions questions_question_tags_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_question_tags_fkey FOREIGN KEY (question_tags) REFERENCES public.tags(tags_id);
 P   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_question_tags_fkey;
       public          postgres    false    219    217    3215            �           2606    16614     questions questions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 J   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_user_id_fkey;
       public          postgres    false    215    3213    219            >   w  x����N�@�ϳO�@��Fc�҄��E�Z[v�]H�Q<j�'�A� Q�¡������ �� ����d����n2�-h�����I_��lf��7Л��Ej���Z��FQPn�^��ܟ����xj@=�5WK5��q0H��U}���~p�!���B�!K �1e��X�1�&����a$��;��M��4P�xG�;�ܶ�#SJj�[� ]����C��C�U�hL{6`ݴ$�H~�*�69��)��'���n%bϓ}5�����ᾈ�П��4��gh��ȿ[�I�u�]g�	����)��b��6s�)�aר�����um?���KD[$�-����	�j\
֕����i?���D�%r�&�|#n9~      @   b   x�32�46�4�0�bÅ6]�z�I��ڋM�)\�sa߅�
�yP��6( ��.�*�w�Q�Ӑ���{��%��
�O�L�4����� M�V6      <   9   x�3�4�,�L�A.cNc(�$�e�i��M9M��!|3N3yCNC0�K�b���� ���      :      x�3��4�4�2�R�\1z\\\ �}      8   �   x�36�4�0�¾���^�s�Y���[.6\�pa#P�����<���l{N3Π�A8���uu��ḼLM�,,��M!��t�0	���� r?��=P�[M ԙF@�*�[Z���Zp��qqq �,�      6   ^  x��V�n�V\�_q�6`3���A�l*���%!�l�R��")��ʩ� Ym�YeQZ-J2e _p�G��KJ�dgU���y͙s?��	����a����V��A-<��;Ǻ����F�$e���̞�y��/��6��m,�`۔��`�6�Q����d��9m��|k`�x�����#{�OY<����Ӭ��h�`��s;�N��k��c����!V)K�$�+G���M������.�D�s8�;4M.;���pp��;����)��nl�y0S��B�BN
���G�ہ��������-B��'a^�*�"Gx)'�$��J�"�	�A�t{���3F����m�4�a3�A�ږ1���+2 �x����b+{CA��:���9 L�7&�&TBb @�b�&2K�@9�[�+UD�ogNl�01���j��G�%QH�Q��м�Mm��f�]�k�M�[o�96�tLRA_��Q��4;1b�K���-�ƞ�����E�HE�q�ը�����M���r{������iQ�|6��HᙝA����h/|�4w����C�4j-�"�?,��LE�Du33��,r1V�K�q�Ib�U6)3 ���*�
��+��� 
���k.�,R���FU�W�9�� Lے�����C[L���s)���9������M8�o�NK5��p=�ܻVJ^��W}֝�����`���hE<ƚ��J9�{�K�+fSa�����/*;����aA <"�uv0/��덚�6���0lsVL�ؽF�:��nf�?�;n$����R���quV\ɎkH��*v�ۡ]�ʖRWRP4���2U��\[&;Zc��}Y�.�?�'u\ ��|�Ě�`&��EIw�)�Vj`.�W%@��c�8 
h]���7�~����}����}+��s�K�K�����F���Su�	*���;��kW�P��P��n�׷��+Ӽ�N�e�ա�fѨ��	@/�u�	�xK����ŋ�[�'7	�R�J��t�?�gOKʝ���U��/�d�������H��k��Q�������Vb�q5�~+�����^��#��3��$�r�hA�څ>7qV���r�:����<�?p�y�      4   �   x�UO��0�폩�4�f�J��X, "đ����CZ��;y��Y'+�L��/���={�W�cQÉC�Mb֠
jl�㛧u9+�h 	�Yx��Z>~��R�~�N�.���������i?�����=P�7�.N��K���I�     