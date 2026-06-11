# AWS ECS로 Express 앱 배포하기

## 예상 카테고리
DevOps / AWS

## 다룰 내용 아이디어
- ECS(Elastic Container Service)란 무엇인가
- ECS vs EC2 직접 배포 차이
- 핵심 개념 정리: Cluster, Task Definition, Service, Container
- Fargate vs EC2 launch type
- ECR(Elastic Container Registry) — Docker 이미지 저장소
- Express 앱 Docker 이미지 만들기
- ECS 배포 전체 흐름: 코드 → Docker 빌드 → ECR 푸시 → ECS 배포
- ALB(Application Load Balancer) 연결
- 환경변수 및 시크릿 관리 (Parameter Store, Secrets Manager)
- CI/CD 파이프라인 연결 (GitHub Actions or GitLab)
