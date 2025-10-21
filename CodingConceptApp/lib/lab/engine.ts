import { Lab } from '../../types';
import labsData from '../../assets/labs.json'; // labs.json 임포트

export type LabExecutionResult = {
  success: boolean;
  output: string;
  error?: string;
};

const labs: Record<string, Lab> = labsData as Record<string, Lab>; // 임포트한 데이터 사용

export function getLab(labId: string): Lab | undefined {
  return labs[labId];
}


/**
 * JS 샌드박스 랩을 실행하고 결과를 반환합니다.
 * 실제 환경에서는 보안을 위해 웹 워커나 iframe 샌드박스를 사용해야 합니다.
 * 여기서는 간단한 eval을 사용하지만, 이는 실제 프로덕션 환경에서 매우 위험합니다.
 */
async function executeJSSandbox(code: string, tests?: string): Promise<LabExecutionResult> {
  return new Promise((resolve) => {
    // 보안상의 이유로 실제 eval 사용은 지양해야 합니다.
    // 여기서는 개념 증명을 위해 임시로 사용합니다.
    let capturedOutput = '';
    let originalConsoleLog = console.log; // try 블록 외부로 이동

    try {
      // 간단한 콘솔 로그 캡처
      console.log = (...args: any[]) => {
        capturedOutput += args.map(String).join(' ') + '\n';
        originalConsoleLog(...args);
      };

      // 코드 실행 (new Function을 사용하여 스코프 문제 해결)
      // !!! 보안 위험: 실제 앱에서는 절대 사용 금지 !!!
      // 테스트를 위한 간단한 expect 함수 (jest.expect의 최소 구현)
      const expect = (received: any) => ({
        toBe: (expected: any) => {
          if (received !== expected) {
            throw new Error(`Expected ${expected}, but received ${received}`);
          }
        },
        // 다른 매처들도 필요에 따라 추가
      });

      // 코드와 테스트를 하나의 함수 스코프 내에서 실행
      const fullCode = `
        ${code} // 사용자 코드 실행 (add 함수 정의)

        ${tests ? `
          (function() { // 새로운 스코프 생성
            const expect = arguments[0]; // expect 함수를 인자로 받음
            try {
              // 테스트 실행 전에 add 함수가 정의되었는지 확인 (예시)
              if (typeof add === 'function') {
                const testResult = add(1, 2); // add 함수 호출 결과 확인
                console.log('add(1, 2) result:', testResult); // 디버깅 로그 추가
                ${tests}
                console.log('\\n테스트 통과!');
              } else {
                throw new Error('add 함수가 정의되지 않았습니다.');
              }
            } catch (testError) {
              console.log('\\n테스트 실패: ' + testError.message);
              throw testError;
            }
          })(expect); // expect 함수를 전달
        ` : ''}
      `;


      const execute = new Function('console', 'expect', fullCode);
      execute(console, expect);

      console.log = originalConsoleLog;

      resolve({ success: true, output: capturedOutput || '코드 실행 완료 (출력 없음)' });
    } catch (e: any) {
      console.log = originalConsoleLog; // 에러 발생 시에도 콘솔 로그 복원
      resolve({ success: false, output: '', error: e.message });
    }
  });
}

/**
 * DOM 미니랩을 실행하고 결과를 반환합니다.
 * 이 기능은 React Native 환경에서 직접 DOM을 조작할 수 없으므로,
 * 웹뷰 또는 별도의 샌드박스 환경이 필요합니다.
 */
async function executeDOMMiniLab(code: string, tests?: string): Promise<LabExecutionResult> {
  return new Promise((resolve) => {
    resolve({
      success: false,
      output: '',
      error: 'DOM 미니랩은 React Native 환경에서 직접 지원되지 않습니다. 웹뷰 통합이 필요합니다.',
    });
  });
}

/**
 * 주어진 랩 타입에 따라 적절한 실행 함수를 호출합니다.
 */
export async function runLab(lab: Lab, code: string): Promise<LabExecutionResult> {
  switch (lab.type) {
    case 'js-sandbox':
      return executeJSSandbox(code, lab.tests);
    case 'dom-mini':
      return executeDOMMiniLab(code, lab.tests);
    // TODO: 다른 랩 타입 (trace, debug-hunt)에 대한 로직 추가
    default:
      return { success: false, output: '', error: `알 수 없는 랩 타입: ${lab.type}` };
  }
}
