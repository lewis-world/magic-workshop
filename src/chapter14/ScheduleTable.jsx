import { useSchedule } from './useSchedule';
import { FaMagic } from 'react-icons/fa';

function Loading() {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-lg">
        <FaMagic className="animate-spin text-purple-600" />
        <span>课表加载中...</span>
      </div>
    );
  }
export default function ScheduleTable() {
  const { schedule, loading } = useSchedule();

  if (loading) return Loading();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📅 霍格沃茨课程表</h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th className="headerCell">课程</th>
            <th className="headerCell">教授</th>
            <th className="headerCell">教室</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map(course => (
            <tr key={course.id} className="row">
              <td className="cell">{course.course_name}</td>
              <td className="cell">{course.professor}</td>
              <td className="cell">{course.classroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}