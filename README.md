# :tada: SSAFY 10기 자율프로젝트 광주 2반 결선 진출 :tada:

# 아이와 만나는 새로운 방법! 아이콘 #
 
<div style="text-align: center;">
  <img src="/readme/image/메인.png" alt="Image">
</div>

<br/>

## 👶 목차
- [🎯 프로젝트 소개](#🎯-프로젝트-소개)
    - [🔎 주요 기능](#🔎-주요-기능)
    - [🔧 기술 스택](#🔧-기술-스택)
    - [💖 역할 분담](#💖-역할-분담)
- [📺 기능 소개](#📺-기능-소개)
  - [⭐ 상태 감지](#⭐-상태-감지)
    - [상태 유형](#상태-유형)
  - [⭐ 알림](#⭐-알림)
    - [워치 화면](#워치-화면)
  - [⭐ 성장 일지](#⭐-성장-일지)
  - [⭐ 보이스 / 챗봇](#⭐-보이스-/-챗봇)
  - [⭐ 회원](#⭐-회원)

- [💾 시스템 아키텍처](#💾-시스템-아키텍처)

## 🎯 프로젝트 소개
> 아이와 만나는 새로운 방법 아이콘(AI-Contact)

청각 장애인 부모의 아기 돌봄 보조 서비스로, 청각 장애인 부모가 집중적으로 아기를 케어할 수 없을 경우 도움을 주는 서비스입니다.

<br/>

### 🔎 주요 기능
**1️⃣ 아기 울음소리 감지 및 분석**

- 가정 환경의 다양한 소음 중에서 **아기 울음 소리만을 감지**하여 청각장애인 부모에게 알려줍니다.
- 아기의 울음 소리를 통해 총 네가지의 **상태(배고픔, 불편함, 아픔, 피곤)로 분석**하여 초보 부모에게 도움을 줍니다.

**2️⃣ 아기 위험 자세 감지**

- 아기의 **위험한 자세를 감지**해 부모에게 알려줍니다.

**3️⃣ 알림 기능**

- **아기 상태 감지 결과**를 알림으로 전송합니다.
- **QR 코드**를 촬영하여 보호자를 등록하고, **등록된 보호자와 동시 알림을 받을 수** 있습니다.
- 청각장애인의 경우, 소리를 듣지 못하기 때문에 소리가 아닌 다른 방식을 통해 알려주어야하는데 가정에서 사용되는 **스마트싱스 기기, 스마트 워치** 등 일상에 녹아든 기기를 활용하여 알림을 전달합니다.

**4️⃣ 아기의 성장일지 및 아기 하루 통계**

- **아기의 하루하루를 기록**으로 남기고, 발생한 이벤트들의 **통계**를 한눈에 볼 수 있습니다.


**5️⃣ 아기 언어 발달을 위한 텍스트 - 음성 변환**

- 아기의 유아기에 부모의 말은 언어 발달에 중요한 요소이므로 이를 대신하기 위해 **원하는 문장을 음성으로 변환**해줍니다.


**6️⃣ 육아 상담 AI 챗봇**

- 아기와 관련된 정보를 **AI 챗봇**을 통해 대화 형식을 통해 쉽게 얻을 수 있습니다.

<br/>

### 🔧 기술 스택

**Frontend**

<div style="display:flex; flex-wrap:wrap; gap:4px">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&amp;logo=React&amp;logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&amp;logo=Typescript&amp;logoColor=white">
<img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&amp;logo=Tailwind CSS&amp;logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&amp;logo=reactquery&amp;logoColor=white">
<img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&amp;logo=&amp;logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&amp;logo=reactrouter&amp;logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&amp;logo=pwa&amp;logoColor=white">
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&amp;logo=firebase&amp;logoColor=white">
<img src="https://img.shields.io/badge/Web Bluetooth-0082FC?style=for-the-badge&amp;logo=bluetooth&amp;logoColor=white">
<img src="https://img.shields.io/badge/Tensorflow.js-FF6F00?style=for-the-badge&amp;logo=tensorflow&amp;logoColor=white">
<img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&amp;logo=threedotjs&amp;logoColor=white">
</div>

<br/>

**Backend**

<div style="display:flex; flex-wrap:wrap; gap:4px">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
<img src="https://img.shields.io/badge/apache kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white"/>
<img src="https://img.shields.io/badge/fast api-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/>
<img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white"/>
</div>

<br/>

**AI**

<div style="display:flex; flex-wrap:wrap; gap:4px">
<img src="https://img.shields.io/badge/Google Colab-F9AB00?style=for-the-badge&logo=Google Colab&logoColor=white"/>
<img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white"/>
<img src="https://img.shields.io/badge/Tensorflow-FF6F00?style=for-the-badge&amp;logo=tensorflow&amp;logoColor=white">
<img src="https://img.shields.io/badge/open ai-412991?style=for-the-badge&amp;logo=openai&amp;logoColor=white">
<img src="https://img.shields.io/badge/Naver Clova-03C75A?style=for-the-badge&amp;logo=naver&amp;logoColor=white">
</div>
    
<br/>

**Infra**

<div style="display:flex; flex-wrap:wrap; gap:4px">
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"/>
<img src="https://img.shields.io/badge/oracle cloud infra-F80000?style=for-the-badge&logo=oracle&logoColor=white"/>
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"/>
<img src="https://img.shields.io/badge/cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white"/>
</div>

<br/>

**Monitoring**
<div style="display:flex; flex-wrap:wrap; gap:4px">
<img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white"/>
<img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white"/>
</div>
    
<br/>

### 💖 역할 분담

|![image](https://hackmd.io/_uploads/S1es5NDm0.png)|![image](https://hackmd.io/_uploads/BkPscEP7C.png)|![image](https://hackmd.io/_uploads/HkOn94D7A.png)|![image](https://hackmd.io/_uploads/ryGTcVPm0.png)|![image](https://hackmd.io/_uploads/r1_RcVDmR.png)|![image](https://hackmd.io/_uploads/HJZC5VDX0.png)|
|:-:|:-:|:-:|:-:|:-:|:-:|
|이도훈|김민석|김현영|김나연|심우석|탁하윤|
|팀장 / BE|BE|BE|FE|FE|FE|

<br/>


## 📺 기능 소개

### ⭐ 상태 감지

|![울음_감지_및_분석](/readme/gif/울음_감지_및_분석.gif)|![행동_감지](/readme/gif/행동_감지.gif)|![on_off](/readme/gif/on_off.gif)|
|:-:|:-:|:-:|
|울음 감지 및 분석|행동 감지|on/off|

#### 상태 유형
    
|![평온함](https://hackmd.io/_uploads/BkOPMOw7A.png)|![아픔](https://hackmd.io/_uploads/Skeam_PQC.png)|![불편함](https://hackmd.io/_uploads/HkH6Q_DmA.png)|![배고픔](https://hackmd.io/_uploads/S1jaQ_w70.png)|![졸림](https://hackmd.io/_uploads/HyGCQOv7A.png)|![위험함](https://hackmd.io/_uploads/BJnbLuwmC.png)|![로딩](https://hackmd.io/_uploads/rJxkNuDmA.png)|![새로고침](https://hackmd.io/_uploads/SJVyNdPXA.png)|![꺼짐](https://hackmd.io/_uploads/BJ_1Edw7C.png)| 
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|평온|아픔|불편|배고픔|졸림|위험|로딩|오류|꺼짐|

<br/>

### ⭐ 알림

|![스마트_싱스](/readme/gif/스마트_싱스.gif)|![워치_연결](/readme/gif/워치_연결.gif)|![qr](/readme/gif/qr.gif)|![토큰](/readme/image/토큰.jpg)|
|:-:|:-:|:-:|:-:|
|스마트 싱스|워치 연결|보호자 등록|토큰 발급|

#### 워치 화면


    
|![rn_image_picker_lib_temp_35a5ea7b-b091-4b8b-943b-f502506e145b](https://hackmd.io/_uploads/HyXD9uvX0.png)|![rn_image_picker_lib_temp_290cbbc6-75d1-485d-b732-a6ebc3966e55](https://hackmd.io/_uploads/BkB_9uwmR.png)|![rn_image_picker_lib_temp_b2cd4e3a-28e4-4856-afcc-2adfe58cbfa7](https://hackmd.io/_uploads/HksOqODm0.png)|![rn_image_picker_lib_temp_0a550ec2-9f8e-47da-ab20-926bd292090b](https://hackmd.io/_uploads/H1-F5dwmR.png)|![rn_image_picker_lib_temp_68c6c486-c50c-4968-bd6f-59dc8b6d13cf](https://hackmd.io/_uploads/Hk859dPmR.png)|![rn_image_picker_lib_temp_f48f5e07-5987-4852-8943-3d9486ae6370](https://hackmd.io/_uploads/HyUscODX0.png)|![rn_image_picker_lib_temp_f5adca03-80e8-4437-9439-3a5be975c119](https://hackmd.io/_uploads/Skni5_vQC.png)|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|평온|아픔|불편|배고픔|졸림|위험|연결|

<br/>

### ⭐ 성장 일지

|![캘린더](/readme/image/캘린더.jpg)|![다이어리](/readme/gif/다이어리.gif)|![통계](/readme/gif/통계.gif)|
|:-:|:-:|:-:|
|캘린더|다이어리|통계|

<br/>

### ⭐ 보이스 / 챗봇

|![음성_변환](/readme/gif/음성_변환.gif)|![즐겨찾기](/readme/gif/즐겨찾기.gif)|![챗봇](/readme/gif/챗봇.gif)|
|:-:|:-:|:-:|
|음성 변환|즐겨찾기|챗봇|

<br/>

### ⭐ 회원

|![권한_설정](/readme/gif/권한_설정.gif)|![회원가입](/readme/gif/회원가입.gif)|![로그인](/readme/gif/로그인.gif)|![로그아웃](/readme/image/로그아웃.jpg)|
|:-:|:-:|:-:|:-:|
|권한 설정|회원가입|로그인|로그아웃|

<br/>

## 💾 시스템 아키텍처

![image](https://hackmd.io/_uploads/SkYCLwPmC.png)

<br/>

## 📖 산출물

### ⭐ [포팅 메뉴얼](https://dokuny.notion.site/3ba2d82a36d3477687950d75ca1fe751)

### ⭐ [API 명세서](https://dokuny.notion.site/API-2a3ab2d7b4734b99ae7e8b3655bfcb62)

### ⭐ [가능 명세서](https://dokuny.notion.site/b1814ac525ea47ffb377e179a7040c0a)
