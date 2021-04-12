/* eslint-disable camelcase */
import React from 'react'
import { Form, Button, Row, Col, Input, Select, Checkbox } from 'antd'
import { SaveOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons'
import parseLabels from 'src/utils/parseLabels'
import isColonFormLabelActive from 'src/globalConfig/colonFormLabel'
import { graphTypesArray } from './graphTypes'

const { TextArea } = Input
const { Option } = Select

function mapOptions(arrayOptions) {
  return (
    arrayOptions &&
    arrayOptions.map(option => (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    ))
  )
}

const graphWidths = [
  { value: 8, label: '8' },
  { value: 12, label: '12' },
  { value: 24, label: '24' },
]

const switchLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 4 },
}

const NewGraphForm = props => {
  const {
    formData,
    onChangeItemValue,
    onChangeSelectItem,
    id,
    dragMode,
    changeDragMode,
    isNewGraph,
    saveGraph,
    cancelGraph,
    deleteGraph,
    colWidth,
  } = props

  // function onChange(e) {
  //   console.log('checked = ', e.target.checked);

  // }

  const DragIcon = () => {
    const url =
      'data:image/png;base64,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'
    return (
      <>
        <div className="drag-icon">
          <img src={url} alt="Drag zone" width="100%" />
        </div>
        <div className="drag-layer" />
      </>
    )
  }

  const colRow = colWidth < 12 ? 24 : 8
  const colDescription = colWidth < 12 ? 24 : 16
  const colItem = colWidth < 12 ? 12 : 24
  if (dragMode) {
    return (
      <Form colon={isColonFormLabelActive}>
        <Row gutter={48}>
          <Col md={24} xs={24}>
            <Form.Item
              labelCol={switchLayout.labelCol}
              wrapperCol={switchLayout.wrapperCol}
              label="Arrastre activo"
            >
              <Checkbox
                // checkedChildren={<CheckOutlined />}
                // unCheckedChildren={<CloseOutlined />}
                onChange={changeDragMode}
                checked={dragMode}
                disabled={isNewGraph}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <DragIcon />
          </Col>
        </Row>
        <Row style={{ marginTop: 175 }} gutter={24}>
          <Col xs={24} sm={24} xl={8}>
            <Button block onClick={() => cancelGraph(isNewGraph, id)}>
              <>
                {parseLabels('button.cancel')}
                <UndoOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              </>
            </Button>
          </Col>
          <Col xs={24} sm={24} xl={8}>
            {!isNewGraph && (
              <Button block type="dashed" onClick={() => deleteGraph(id)}>
                <>
                  {parseLabels('button.delete')}
                  <DeleteOutlined style={{ marginLeft: 10, fontSize: 18 }} />
                </>
              </Button>
            )}
          </Col>
          <Col xs={24} sm={24} xl={8}>
            <Button
              block
              type="primary"
              onClick={() => saveGraph(isNewGraph, id)}
            >
              <>
                {parseLabels('button.save')}
                <SaveOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              </>
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
  return (
    <Form colon={isColonFormLabelActive}>
      <Row gutter={48}>
        <Col md={24} xs={24}>
          <Form.Item
            labelCol={switchLayout.labelCol}
            wrapperCol={switchLayout.wrapperCol}
            label="Arrastre activo"
          >
            <Checkbox
              // checkedChildren={<CheckOutlined />}
              // unCheckedChildren={<CloseOutlined />}
              onChange={changeDragMode}
              checked={dragMode}
              disabled={isNewGraph}
            />
          </Form.Item>
        </Col>
        <Col md={24} xs={24}>
          <Form.Item
            label={parseLabels('forms.dash.graphs.title.graph_title')}
            hasFeedback={formData.hasFeedback}
            validateStatus={formData.validate.title ? 'error' : 'success'}
            help={formData.validate.title && formData.validate.title.message}
          >
            <Input
              placeholder={parseLabels(
                'forms.dash.graphs.placeholder.graph_title'
              )}
              id="title"
              name="title"
              value={formData.form.title}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} xl={colDescription}>
          <Form.Item
            label={parseLabels('forms.dash.graphs.title.graph_description')}
            hasFeedback={formData.hasFeedback}
            validateStatus={formData.validate.description ? 'error' : 'success'}
            help={
              formData.validate.description &&
              formData.validate.description.message
            }
          >
            <TextArea
              placeholder={parseLabels(
                'forms.dash.graphs.placeholder.graph_description'
              )}
              rows={3}
              id="description"
              name="description"
              value={formData.form.description}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} xl={colRow}>
          <Row>
            <Col span={colItem}>
              <Form.Item
                label={parseLabels('forms.dash.graphs.title.graph_type')}
                hasFeedback={formData.hasFeedback}
                validateStatus={formData.validate.type ? 'error' : 'success'}
                help={formData.validate.type && formData.validate.type.message}
              >
                <Select
                  placeholder={parseLabels(
                    'forms.dash.graphs.placeholder.graph_type'
                  )}
                  onChange={e => onChangeSelectItem(e, 'type')}
                  value={formData.form.type}
                >
                  {mapOptions(graphTypesArray)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={colItem}>
              <Form.Item
                label={parseLabels('forms.dash.graphs.title.graph_width')}
                hasFeedback={formData.hasFeedback}
                validateStatus={formData.validate.cols ? 'error' : 'success'}
                help={formData.validate.cols && formData.validate.cols.message}
              >
                <Select
                  placeholder={parseLabels(
                    'forms.dash.graphs.placeholder.graph_width'
                  )}
                  onChange={e => onChangeSelectItem(e, 'cols')}
                  value={formData.form.cols}
                >
                  {mapOptions(graphWidths)}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[48, 0]}>
        <Col span={24}>
          <Form.Item
            label={parseLabels('forms.dash.graphs.title.graph_query')}
            hasFeedback={formData.hasFeedback}
            validateStatus={formData.validate.query ? 'error' : 'success'}
            help={formData.validate.query && formData.validate.query.message}
          >
            <TextArea
              placeholder={parseLabels(
                'forms.dash.graphs.placeholder.graph_query'
              )}
              id="query"
              name="query"
              value={formData.form.query}
              onChange={onChangeItemValue}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={24} xl={8}>
          <Button block onClick={() => cancelGraph(isNewGraph, id)}>
            <>
              {parseLabels('button.cancel')}
              <UndoOutlined style={{ marginLeft: 10, fontSize: 18 }} />
            </>
          </Button>
        </Col>
        <Col xs={24} sm={24} xl={8}>
          {!isNewGraph && (
            <Button block type="dashed" onClick={() => deleteGraph(id)}>
              <>
                {parseLabels('button.delete')}
                <DeleteOutlined style={{ marginLeft: 10, fontSize: 18 }} />
              </>
            </Button>
          )}
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <Button
            block
            type="primary"
            onClick={() => saveGraph(isNewGraph, id)}
          >
            <>
              {parseLabels('button.save')}
              <SaveOutlined style={{ marginLeft: 10, fontSize: 18 }} />
            </>
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default NewGraphForm
