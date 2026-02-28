#!/bin/bash
# ralph.sh — Dev Blog 자율 개발 루프
# 사용법: ./ralph.sh [최대 반복 횟수]
# 기본 최대 반복: 50

MAX_ITER=${1:-50}
ITER=0
PROJECT_DIR="$(dirname "$0")"

echo "🔁 Ralph Loop 시작 — 최대 $MAX_ITER 회"
echo "📁 프로젝트: $PROJECT_DIR"
echo ""

while [ $ITER -lt $MAX_ITER ]; do
  ITER=$((ITER + 1))
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔄 반복 $ITER / $MAX_ITER"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Claude Code 실행
  OUTPUT=$(claude -p "
Read CLAUDE.md for your operating instructions.
Read PRD.md for the full task list.
Read progress.json to find the next task where done is false.
Implement that single task now, following all rules in CLAUDE.md.
When done, update progress.json and commit.
If all tasks are complete, output <promise>COMPLETE</promise>.
" 2>&1)

  echo "$OUTPUT"

  # 완료 신호 감지
  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "✅ 모든 태스크 완료! Ralph Loop 종료."
    exit 0
  fi

  echo ""
  sleep 2
done

echo "⚠️  최대 반복 횟수($MAX_ITER)에 도달했습니다."
echo "남은 태스크는 progress.json을 확인하세요."
exit 1
