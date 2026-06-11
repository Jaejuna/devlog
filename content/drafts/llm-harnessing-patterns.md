# LLM 하네싱 구조와 패턴들

## 예상 카테고리
AI / LLM

## 다룰 내용 아이디어
- LLM 하네싱이란 — LLM을 애플리케이션에 연결하는 방식 총칭
- 기본 패턴: 단순 프롬프트 → 응답
- RAG(Retrieval-Augmented Generation) — 외부 지식 주입 패턴
- Tool Use / Function Calling — LLM이 외부 도구를 호출하는 구조
- Agent 패턴 — 계획(Plan) → 실행(Act) → 관찰(Observe) 루프
- Multi-Agent 패턴 — 역할 분리된 여러 LLM 인스턴스 협업
- Orchestrator / Subagent 구조
- Memory 패턴 — 단기(컨텍스트 윈도우) vs 장기(외부 저장소)
- Prompt Chaining — 여러 LLM 호출을 순서대로 연결
- Parallelization — 독립적인 작업을 병렬로 처리
- 각 패턴의 적합한 사용 시나리오와 트레이드오프
